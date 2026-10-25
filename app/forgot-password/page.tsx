'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PageHero from '@/components/ui/PageHero'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Forgot Password"
        description="Enter your email and we will send you a link to reset it."
      />

      <div className="max-w-md mx-auto px-6 py-16">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-navy-900 mb-2">Check Your Email</h2>
              <p className="text-sm text-gray-600">
                If an account exists for <strong>{email}</strong>, a reset link is on its way. It
                can take a few minutes, so check your spam folder too.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />

              {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Remembered it?{' '}
            <Link href="/login" className="font-medium text-brand-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}