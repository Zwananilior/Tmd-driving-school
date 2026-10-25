'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PageHero from '@/components/ui/PageHero'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [hasSession, setHasSession] = useState(false)
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return
      setHasSession(!!session)
      setChecking(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) {
        setHasSession(true)
        setChecking(false)
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (form.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setErrorMsg('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: form.password })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    setDone(true)
    setTimeout(() => router.push('/'), 2000)
  }

  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Reset Password"
        description="Choose a new password for your account."
      />

      <div className="max-w-md mx-auto px-6 py-16">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          {checking ? (
            <p className="text-center text-sm text-gray-500">Checking your link...</p>
          ) : done ? (
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-navy-900 mb-2">Password Updated</h2>
              <p className="text-sm text-gray-600">Taking you to the home page...</p>
            </div>
          ) : !hasSession ? (
            <div className="text-center">
              <h2 className="text-xl font-extrabold text-navy-900 mb-2">Link Expired</h2>
              <p className="text-sm text-gray-600 mb-6">
                This reset link is invalid or has expired. Please request a new one.
              </p>
              <Link
                href="/forgot-password"
                className="inline-block rounded-full bg-brand-500 hover:bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                Request New Link
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                name="password"
                placeholder="New password (min 6 characters)"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm new password"
                value={form.confirm}
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
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}