import Reveal from '@/components/ui/Reveal'

// SAMPLE text for building the design. Replace with real student reviews before going live.
const testimonials = [
  {
    name: 'Thandi M.',
    note: 'Passed First Time',
    quote:
      'TMD Driving School made the whole experience so easy and stress-free. My instructor was patient, professional and really helped me build my confidence.',
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
      "I was nervous at first, but they really supported me every step of the way. I passed my test and I'm so grateful!",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-brand-500 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-10">
            What Our Students Say
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-500">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-gray-600">"{t.quote}"</p>
                    <p className="mt-4 text-sm font-semibold text-navy-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.note}</p>
                    <p className="mt-1 text-brand-500">★★★★★</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}