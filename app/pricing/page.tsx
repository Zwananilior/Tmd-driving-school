import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PageHero from '@/components/ui/PageHero'
import Reveal from '@/components/ui/Reveal'

// Always fetch fresh data so price changes in Supabase show up immediately
export const revalidate = 0

interface Package {
  id: string
  name: string
  description: string | null
  lesson_count: number
  price: number
  features: string[] | null
  is_popular: boolean
  sort_order: number
}

export default async function PricingPage() {
  const { data } = await supabase
    .from('packages')
    .select('*')
    .order('sort_order', { ascending: true })

  const packages = (data as Package[]) || []

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, Honest Pricing"
        description="Choose the package that fits where you are on your driving journey."
      />

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          {packages.length === 0 ? (
            <p className="text-center text-gray-500">
              Packages are being updated. Please check back soon.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3 items-stretch">
              {packages.map((p, i) => (
                <Reveal key={p.id} delay={i * 100} className="h-full">
                  <div
                    className={
                      p.is_popular
                        ? 'relative h-full flex flex-col rounded-3xl bg-navy-950 text-white p-8 shadow-xl ring-2 ring-brand-500'
                        : 'relative h-full flex flex-col rounded-3xl bg-white text-navy-900 p-8 border border-gray-200 shadow-sm'
                    }
                  >
                    {p.is_popular && (
                      <span className="absolute -top-3 left-8 rounded-full bg-brand-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                        Most Popular
                      </span>
                    )}

                    <h2 className="text-xl font-extrabold mb-1">{p.name}</h2>
                    <p className={p.is_popular ? 'text-gray-300 text-sm mb-6' : 'text-gray-500 text-sm mb-6'}>
                      {p.description}
                    </p>

                    <p className="text-4xl font-extrabold mb-1">
                      R{Number(p.price).toLocaleString('en-ZA')}
                    </p>
                    <p className={p.is_popular ? 'text-brand-400 text-xs mb-6' : 'text-brand-500 text-xs mb-6'}>
                      {p.lesson_count} lessons · about R{Math.round(p.price / p.lesson_count)} per lesson
                    </p>

                    <ul className="space-y-3 text-sm mb-8">
                      {(p.features || []).map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-0.5 text-brand-500">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={'/booking?package=' + p.id}
                      className="mt-auto text-center rounded-full bg-brand-500 hover:bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors"
                    >
                      Choose {p.name}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <p className="mt-10 text-center text-xs text-gray-400">
            Prices are indicative and may change. Contact us if you need a custom package.
          </p>
        </div>
      </section>
    </>
  )
}