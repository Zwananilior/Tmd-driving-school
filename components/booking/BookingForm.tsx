'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'
import {
  BookingPackage,
  TIME_SLOTS,
  formatSlot,
  isSunday,
  tomorrowSA,
} from '@/lib/bookingConfig'

export default function BookingForm({
  packages,
  initialPackageId,
}: {
  packages: BookingPackage[]
  initialPackageId: string
}) {
  const { user, loading: authLoading } = useAuth()

  const startId = packages.some((p) => p.id === initialPackageId) ? initialPackageId : ''
  const [packageId, setPackageId] = useState(startId)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const selected = packages.find((p) => p.id === packageId)
  const minDate = tomorrowSA()

  if (authLoading) {
    return <p className="py-10 text-center text-gray-500">Checking your account...</p>
  }


  if (!user) {
    const back = encodeURIComponent('/booking' + (packageId ? '?package=' + packageId : ''))
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <h2 className="mb-2 text-2xl font-extrabold text-navy-900">Log In to Book</h2>
        <p className="mb-6 text-sm text-gray-600">
          You need a free account so we can keep track of your lessons and payments.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={'/login?redirect=' + back}
            className="rounded-full bg-brand-500 hover:bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            Log In
          </Link>
          <Link
            href={'/register?redirect=' + back}
            className="rounded-full border border-gray-300 hover:border-brand-500 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    )
  }

  if (packages.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        Packages are being updated. Please check back soon.
      </p>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!packageId) {
      setErrorMsg('Please choose a package.')
      return
    }
    if (!date || date < minDate || isSunday(date)) {
      setErrorMsg('Please choose a date from tomorrow onwards, Monday to Saturday.')
      return
    }
    if (!time) {
      setErrorMsg('Please choose a start time.')
      return
    }

    setSubmitting(true)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      setErrorMsg('Your session has expired. Please log in again.')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session.access_token,
        },
        body: JSON.stringify({ packageId, date, time, notes }),
      })

      const result = await res.json().catch(() => ({}))

      if (!res.ok || !result.url) {
        setErrorMsg(result.error || 'Could not start payment. Please try again.')
        setSubmitting(false)
        return
      }

     
      window.location.href = result.url
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-navy-900">1. Choose your package</legend>
        <div className="grid gap-3">
          {packages.map((p) => {
            const active = p.id === packageId
            return (
              <label
                key={p.id}
                className={
                  'flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ' +
                  (active
                    ? 'border-brand-500 bg-brand-500/5 ring-2 ring-brand-500'
                    : 'border-gray-200 hover:border-brand-400')
                }
              >
                <input
                  type="radio"
                  name="package"
                  value={p.id}
                  checked={active}
                  onChange={() => setPackageId(p.id)}
                  className="sr-only"
                />
                <div>
                  <p className="font-semibold text-navy-900">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.lesson_count} lessons</p>
                </div>
                <p className="text-lg font-extrabold text-navy-900">
                  R{Number(p.price).toLocaleString('en-ZA')}
                </p>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-navy-900">
          2. Preferred start date and time
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="date"
            value={date}
            min={minDate}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Select a time</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {formatSlot(slot)}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          This is your preference. We will confirm your first lesson with you after payment.
        </p>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-navy-900">3. Notes (optional)</legend>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          maxLength={500}
          placeholder="Anything we should know? For example, your experience or your pickup area."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </fieldset>

      <div className="rounded-2xl bg-gray-50 p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{selected ? selected.name + ' package' : 'No package selected'}</span>
          <span className="text-lg font-extrabold text-navy-900">
            {selected ? 'R' + Number(selected.price).toLocaleString('en-ZA') : '-'}
          </span>
        </div>
      </div>

      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 px-6 py-3.5 text-sm font-semibold text-white transition-colors"
      >
        {submitting ? 'Redirecting to payment...' : 'Continue to Secure Payment'}
      </button>
    </form>
  )
}