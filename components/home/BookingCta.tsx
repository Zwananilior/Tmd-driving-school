import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export default function BookingCta() {
  return (
    <section className="bg-white pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-8 py-12 md:px-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-brand-400 text-xs font-semibold uppercase tracking-[0.25em] mb-2">
                  Ready to get started?
                </p>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
                  Book Your Driving Lesson Today
                </h2>
                <p className="text-gray-300 text-sm">
                  Take the first step towards your freedom. It only takes a few minutes!
                </p>
              </div>

              <Link
                href="/booking"
                className="whitespace-nowrap bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors"
              >
                Book Now →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}