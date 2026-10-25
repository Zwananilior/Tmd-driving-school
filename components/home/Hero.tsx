import Link from 'next/link'

const badges = [
  {
    label: 'Licensed Instructors',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    label: 'High Pass Rate',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: 'Flexible Scheduling',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

export default function Hero() {
  return (
<section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/images/27725622555_status_c883cbfbab6040fa899d6e2aed8c26a8_1.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-xl">
          <p className="text-brand-400 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Drive Your Future
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            TMD Driving School
          </h1>
          <p className="text-4xl md:text-5xl font-extrabold leading-tight text-brand-500 mb-6">
            Safe Drivers. Brighter Futures.
          </p>

          <p className="text-gray-200 mb-8">
            We provide professional, reliable and affordable driving lessons to help you gain the
            skills, confidence and freedom to hit the road.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/booking"
              className="bg-brand-500 hover:bg-brand-600 text-white px-7 py-3 rounded-full text-sm font-semibold transition-colors"
            >
              Book a Lesson →
            </Link>
            <Link
              href="/about"
              className="border border-white/60 hover:border-white text-white px-7 py-3 rounded-full text-sm font-semibold transition-colors"
            >
              Learn More
            </Link>
          </div>

          <div className="flex flex-wrap gap-8">
            {badges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 text-brand-400">
                {badge.icon}
                <span className="text-sm text-white leading-tight max-w-[90px]">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}