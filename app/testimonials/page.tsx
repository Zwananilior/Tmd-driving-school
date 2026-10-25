import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import Reveal from '@/components/ui/Reveal'

const testimonials = [
  {
    name: 'Thandi M.',
    note: 'Passed First Time',
    quote:
      'TMD Driving School made the whole experience so easy and stress-free. My instructor was patient and really helped me build my confidence.',
  },
  {
    name: 'Sipho D.',
    note: 'Passed First Time',
    quote:
      'Great instructors, clean cars and flexible scheduling. I highly recommend TMD to anyone who wants to learn to drive.',
  },
  {
    name: 'Lerato K.',
    note: 'Passed First Time',
    quote:
      'I was nervous at first, but they supported me every step of the way. I passed my test and I am so grateful!',
  },
  {
    name: 'Nomsa P.',
    note: 'Refresher Course',
    quote:
      'I had not driven in years. The refresher lessons gave me my confidence back and I am now driving to work.',
  },
  {
    name: 'Bheki Z.',
    note: 'Beginner Lessons',
    quote:
      'My instructor explained everything clearly and never rushed me. I felt safe from the very first lesson.',
  },
  {
    name: 'Ayanda S.',
    note: 'Test Preparation',
    quote:
      'The mock test showed me exactly what to work on. By test day I knew what to expect and I passed.',
  },
]

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What Our Students Say"
        description="Real experiences from people who learned to drive with TMD."
      />

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className="h-full">
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <p className="mb-3 text-brand-500">★★★★★</p>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-500">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.note}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="mb-3 text-2xl font-extrabold text-navy-900">Ready to join them?</h2>
          <p className="mb-6 text-sm text-gray-600">
            Pick a package and book your first lesson today.
          </p>
          <Link
            href="/booking"
            className="inline-block rounded-full bg-brand-500 hover:bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors"
          >
            Book a Lesson
          </Link>
        </div>
      </section>
    </>
  )
}