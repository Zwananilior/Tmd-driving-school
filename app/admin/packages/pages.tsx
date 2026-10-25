'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Pkg {
  id: string
  name: string
  description: string | null
  lesson_count: number
  price: number
  features: string[] | null
  is_popular: boolean
  sort_order: number
}

const empty = {
  name: '',
  description: '',
  lesson_count: '',
  price: '',
  features: '',
  is_popular: false,
  sort_order: '0',
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Pkg[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('packages').select('*').order('sort_order', { ascending: true })
    setPackages((data as Pkg[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const openNew = () => {
    setEditingId(null)
    setForm(empty)
    setErrorMsg('')
    setShowForm(true)
  }

  const openEdit = (p: Pkg) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      description: p.description || '',
      lesson_count: String(p.lesson_count),
      price: String(p.price),
      features: (p.features || []).join('\n'),
      is_popular: p.is_popular,
      sort_order: String(p.sort_order),
    })
    setErrorMsg('')
    setShowForm(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const lessons = Number(form.lesson_count)
    const price = Number(form.price)
    if (!form.name.trim() || !Number.isInteger(lessons) || lessons < 1 || !(price > 0)) {
      setErrorMsg('Enter a name, a whole number of lessons, and a price above 0.')
      return
    }

    setSaving(true)
    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      lesson_count: lessons,
      price,
      features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
      is_popular: form.is_popular,
      sort_order: Number(form.sort_order) || 0,
    }

    const result = editingId
      ? await supabase.from('packages').update(payload).eq('id', editingId).select('id')
      : await supabase.from('packages').insert([payload]).select('id')

    setSaving(false)

    if (result.error || !result.data || result.data.length === 0) {
      setErrorMsg('Could not save. Check that the admin policies were created.')
      return
    }

    setShowForm(false)
    setEditingId(null)
    load()
  }

  const remove = async (p: Pkg) => {
    if (!window.confirm('Delete "' + p.name + '"?')) return
    setErrorMsg('')
    const { data, error } = await supabase.from('packages').delete().eq('id', p.id).select('id')
    if (error || !data || data.length === 0) {
      setErrorMsg('Could not delete "' + p.name + '". Packages that already have bookings cannot be deleted. Edit it instead.')
      return
    }
    load()
  }

  const input =
    'w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500'

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-navy-900">Packages</h1>
        <button
          onClick={openNew}
          className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          + Add Package
        </button>
      </div>

      {errorMsg && <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</p>}

      {showForm && (
        <form onSubmit={save} className="mb-8 space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="font-extrabold text-navy-900">{editingId ? 'Edit Package' : 'New Package'}</h2>

          <input name="name" value={form.name} onChange={handleChange} placeholder="Package name" className={input} />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Short description" className={input} />

          <div className="grid gap-4 sm:grid-cols-3">
            <input name="lesson_count" type="number" min="1" value={form.lesson_count} onChange={handleChange} placeholder="Lessons" className={input} />
            <input name="price" type="number" min="1" step="1" value={form.price} onChange={handleChange} placeholder="Price (R)" className={input} />
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} placeholder="Order" className={input} />
          </div>

          <textarea
            name="features"
            value={form.features}
            onChange={handleChange}
            rows={4}
            placeholder={'One feature per line, for example:\n10 one-hour lessons\nLicensed instructor'}
            className={input}
          />

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="is_popular" checked={form.is_popular} onChange={handleChange} />
            Mark as "Most Popular"
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-gray-300 px-6 py-2.5 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="py-10 text-center text-sm text-gray-500">Loading packages...</p>
      ) : (
        <div className="space-y-3">
          {packages.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div>
                <p className="font-semibold text-navy-900">
                  {p.name} {p.is_popular && <span className="ml-1 text-xs text-brand-500">Most Popular</span>}
                </p>
                <p className="text-xs text-gray-500">
                  {p.lesson_count} lessons · R{Number(p.price).toLocaleString('en-ZA')}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)} className="rounded-full border border-gray-300 px-4 py-1.5 text-xs hover:bg-gray-50">
                  Edit
                </button>
                <button onClick={() => remove(p)} className="rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}