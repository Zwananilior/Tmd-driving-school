'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PageHero from '@/components/ui/PageHero'
import GoogleButton from '@/components/auth/GoogleButton'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const raw = searchParams.get('redirect') || '/'
  const redirectTo = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/'

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [checkEmail, setCheckEmail] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name, phone: form.phone },
        emailRedirectTo: window.location.origin + '/',
      },
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    if (data.session) {
      router.push(redirectTo)
      return
    }

    
    setCheckEmail(true)
    setLoading(false)
  }

  if (checkEmail) {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-extrabold text-navy-900 mb-2">Check Your Email</h2>
          <p className="text-sm text-gray-600">
            We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your
            account.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-extrabold text-navy-900 text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-brand-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Create Account"
        description="Sign up to book lessons and track your progress."
      />
      <Suspense fallback={<p className="py-16 text-center text-gray-500">Loading...</p>}>
        <RegisterForm />
      </Suspense>
    </>
  )
}
