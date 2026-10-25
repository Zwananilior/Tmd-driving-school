import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  
  const body = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature check failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.bookingId

    if (bookingId && session.payment_status === 'paid') {
      const { error } = await supabaseAdmin
        .from('bookings')
        .update({
          payment_status: 'paid',
          stripe_session_id: session.id,
          stripe_payment_intent:
            typeof session.payment_intent === 'string' ? session.payment_intent : null,
        })
        .eq('id', bookingId)

      if (error) {
        console.error('Could not mark booking paid:', error)
        
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
      }
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.bookingId

    if (bookingId) {
      await supabaseAdmin
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('payment_status', 'unpaid')
    }
  }

  return NextResponse.json({ received: true })
}