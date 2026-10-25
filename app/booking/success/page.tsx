import Link from 'next/link'
import { stripe } from '@/lib/stripe'
import PageHero from '@/components/ui/PageHero'

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const sessionId = params.session_id

  let paid = false
  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      paid = session.payment_status === 'paid'
    } catch (err) {
      console.error('Could not check Stripe session:', err)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title={paid ? 'Payment Received' : 'Almost There'}
      />

      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          {paid ? (
            <>
              <h2 className="mb-2 text-2xl font-extrabold text-navy-900">Thank you!</h2>
              <p className="mb-6 text-sm text-gray-600">
                Your payment was successful. Our team will contact you shortly to confirm your
                first lesson.
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-2 text-2xl font-extrabold text-navy-900">
                We could not confirm your payment yet
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                If you were charged, please contact us and we will sort it out quickly.
              </p>
            </>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-brand-500 hover:bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-gray-300 hover:border-brand-500 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}