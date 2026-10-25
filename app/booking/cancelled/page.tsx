import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'

export default function BookingCancelledPage() {
  return (
    <>
      <PageHero eyebrow="Booking" title="Payment Cancelled" />

      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <p className="mb-6 text-sm text-gray-600">
            Your payment was not completed, so nothing was charged and your lessons are not yet
            booked. You can try again whenever you are ready.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/booking"
              className="rounded-full bg-brand-500 hover:bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-gray-300 hover:border-brand-500 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}