'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { formatSlot } from '@/lib/bookingConfig'

interface Row {
  id: string
  user_id: string
  preferred_date: string
  preferred_time: string
  notes: string | null
  status: string
  payment_status: string
  amount: number | null
  created_at: string
  packages: { name: string; lesson_count: number } | { name: string; lesson_count: number }[] | null
}

interface Person {
  id: string
  full_name: string | null
  phone: string | null
}

const FILTERS = ['all', 'pending', 'confirmed', 'completed', 'cancelled']

function pkgOf(r: Row) {
  return Array.isArray(r.packages) ? r.packages[0] : r.packages
}

export default function AdminBookingsPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [people, setPeople] = useState<Record<string, Person>>({})
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('bookings')
      .select('id, user_id, preferred_date, preferred_time, notes, status, payment_status, amount, created_at, packages(name, lesson_count)')
      .order('created_at', { ascending: false })

    const list = (data as unknown as Row[]) || []
    setRows(list)

    const ids = Array.from(new Set(list.map((r) => r.user_id)))
    if (ids.length > 0) {
      const { data: profs } = await supabase
        .from('profiles')
        .select('id, full_name, phone')
        .in('id', ids)
      const map: Record<string, Person> = {}
      ;(profs || []).forEach((p) => {
        map[p.id] = p as Person
      })
      setPeople(map)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const setStatus = async (id: string, status: string) => {
    setBusyId(id)
    setErrorMsg('')

    
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select('id')

    if (error || !data || data.length === 0) {
      setErrorMsg('Could not update the booking. Check that the admin policies were created.')
    } else {
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    }
    setBusyId(null)
  }

  const shown = filter === 'all' ? rows : rows.filter((r) => r.status === filter)

  const badge = (s: string) =>
    s === 'confirmed' ? 'bg-green-100 text-green-700'
    : s === 'pending' ? 'bg-yellow-100 text-yellow-700'
    : s === 'completed' ? 'bg-blue-100 text-blue-700'
    : 'bg-red-100 text-red-700'

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-navy-900">Bookings</h1>
        <button
          onClick={load}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:bg-white"
        >
          Refresh
        </button>
      </div>

      {errorMsg && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</p>
      )}

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              'rounded-full px-4 py-2 text-sm font-medium capitalize ' +
              (filter === f
                ? 'bg-brand-500 text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50')
            }
          >
            {f}
            {f !== 'all' && ' (' + rows.filter((r) => r.status === f).length + ')'}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-gray-500">Loading bookings...</p>
      ) : shown.length === 0 ? (
        <p className="rounded-2xl bg-white p-10 text-center text-sm text-gray-500">
          No bookings here.
        </p>
      ) : (
        <div className="space-y-3">
          {shown.map((r) => {
            const person = people[r.user_id]
            const pkg = pkgOf(r)
            const busy = busyId === r.id
            return (
              <div key={r.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-navy-900">{person?.full_name || 'Unnamed student'}</p>
                    <p className="text-xs text-gray-500">{person?.phone || 'No phone'}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ' + badge(r.status)}>
                      {r.status}
                    </span>
                    <span
                      className={
                        'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ' +
                        (r.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500')
                      }
                    >
                      {r.payment_status}
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid gap-1 text-sm text-gray-600 sm:grid-cols-3">
                  <p>
                    <span className="text-gray-400">Package: </span>
                    {pkg ? pkg.name + ' (' + pkg.lesson_count + ' lessons)' : 'Unknown'}
                  </p>
                  <p>
                    <span className="text-gray-400">Preferred start: </span>
                    {r.preferred_date}, {formatSlot(r.preferred_time)}
                  </p>
                  <p>
                    <span className="text-gray-400">Amount: </span>
                    R{Number(r.amount ?? 0).toLocaleString('en-ZA')}
                  </p>
                </div>

                {r.notes && <p className="mt-2 text-xs text-gray-500">Note: {r.notes}</p>}

                <div className="mt-4 flex flex-wrap gap-2">
                  {r.status === 'pending' && (
                    <button
                      onClick={() => setStatus(r.id, 'confirmed')}
                      disabled={busy || r.payment_status !== 'paid'}
                      title={r.payment_status !== 'paid' ? 'Waiting for payment' : ''}
                      className="rounded-full bg-green-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-40"
                    >
                      Confirm
                    </button>
                  )}
                  {r.status === 'confirmed' && (
                    <button
                      onClick={() => setStatus(r.id, 'completed')}
                      disabled={busy}
                      className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40"
                    >
                      Mark Completed
                    </button>
                  )}
                  {(r.status === 'pending' || r.status === 'confirmed') && (
                    <button
                      onClick={() => setStatus(r.id, 'cancelled')}
                      disabled={busy}
                      className="rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-40"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <p className="mt-6 text-xs text-gray-400">
        Cancelling does not refund money. To refund a paid booking, use the Refund button on the
        payment in your Stripe dashboard.
      </p>
    </div>
  )
}