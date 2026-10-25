'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import PageHero from '@/components/ui/PageHero'

const details = [
  { label: 'Phone', value: '+27 00 000 0000' },
  { label: 'Email', value: 'hello@example.com' },
  { label: 'Area', value: 'Your town, South Africa' },
  { label: 'Hours', value: 'Mon to Sat, 8am to 5pm' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const { error } = await supabase.from('contact_messages').insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
      },
    ])

    if (error) {
      setStatus('error')
      return
    }

    setStatus('sent')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get In Touch"
        description="Questions about lessons or packages? Send us a message."
      />

      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Contact Details</h2>
            <ul className="space-y-4 text-sm">
              {details.map((d) => (
                <li key={d.label}>
                  <span className="block text-xs uppercase tracking-widest text-brand-500">
                    {d.label}
                  </span>
                  <span className="text-gray-700">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Send a Message</h2>

            {status === 'sent' ? (
              <div className="rounded-2xl bg-brand-500/10 p-6 text-sm text-navy-900">
                Thank you. Your message has been sent and we will get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />

                {status === 'error' && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 px-7 py-3 text-sm font-semibold text-white transition-colors"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}