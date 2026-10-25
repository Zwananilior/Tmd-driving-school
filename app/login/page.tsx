'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PageHero from '@/components/ui/PageHero'
import GoogleButton from '@/components/auth/GoogleButton'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  
  const raw = searchParams.get('redirect') || '/'
  const redirectTo = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    router.push(redirectTo)
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-extrabold text-navy-900 text-center mb-6">Welcome Back</h2>

        <GoogleButton redirectTo={redirectTo} />

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs uppercase text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />

          <div className="text-right">
            <Link href="/forgot-password" className="text-xs text-brand-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{' '}
          <Link href="/register" className="font-medium text-brand-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <>
      <PageHero eyebrow="Account" title="Log In" description="Access your lessons and progress." />
      <Suspense fallback={<p className="py-16 text-center text-gray-500">Loading...</p>}>
        <LoginForm />
      </Suspense>
    </>
  )
}