import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { stripe } from '@/lib/stripe'
import { TIME_SLOTS, isSunday, isValidDateString, tomorrowSA } from '@/lib/bookingConfig'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) {
    return NextResponse.json({ error: 'Please log in to book.' }, { status: 401 })
  }

  const { data: userData, error: authError } = await supabaseAdmin.auth.getUser(token)
  const user = userData?.user
  if (authError || !user) {
    return NextResponse.json(
      { error: 'Your session has expired. Please log in again.' },
      { status: 401 }
    )
  }

  
  const body = await request.json().catch(() => null)
  const packageId = typeof body?.packageId === 'string' ? body.packageId : ''
  const date = typeof body?.date === 'string' ? body.date : ''
  const time = typeof body?.time === 'string' ? body.time : ''
  const notes = typeof body?.notes === 'string' ? body.notes.trim().slice(0, 500) : ''

  if (!packageId) {
    return NextResponse.json({ error: 'Please choose a package.' }, { status: 400 })
  }
  if (!isValidDateString(date) || date < tomorrowSA() || isSunday(date)) {
    return NextResponse.json(
      { error: 'Please choose a date from tomorrow onwards, Monday to Saturday.' },
      { status: 400 }
    )
  }
  if (!TIME_SLOTS.includes(time)) {
    return NextResponse.json({ error: 'Please choose a valid time.' }, { status: 400 })
  }

  
  const { data: pkg } = await supabaseAdmin
    .from('packages')
    .select('id, name, lesson_count, price')
    .eq('id', packageId)
    .maybeSingle()

  if (!pkg) {
    return NextResponse.json({ error: 'That package was not found.' }, { status: 404 })
  }


  const { data: booking, error: insertError } = await supabaseAdmin
    .from('bookings')
    .insert({
      user_id: user.id,
      package_id: pkg.id,
      preferred_date: date,
      preferred_time: time,
      notes: notes || null,
      amount: pkg.price,
    })
    .select('id')
    .single()

  if (insertError || !booking) {
    console.error('Booking insert failed:', insertError)
    return NextResponse.json({ error: 'Could not save your booking.' }, { status: 500 })
  }


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'zar',
            unit_amount: Math.round(Number(pkg.price) * 100), // Stripe uses cents
            product_data: {
              name: pkg.name + ' package (' + pkg.lesson_count + ' lessons)',
            },
          },
        },
      ],
      metadata: { bookingId: booking.id },
      success_url: siteUrl + '/booking/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: siteUrl + '/booking/cancelled',
    })

    await supabaseAdmin
      .from('bookings')
      .update({ stripe_session_id: session.id })
      .eq('id', booking.id)

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout failed:', err)
    
    await supabaseAdmin.from('bookings').delete().eq('id', booking.id)
    return NextResponse.json(
      { error: 'Could not start payment. Please try again.' },
      { status: 500 }
    )
  }
}