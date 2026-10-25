'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Msg {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  is_read: boolean
  created_at: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    setMessages((data as Msg[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const toggle = async (m: Msg) => {
    const opening = openId !== m.id
    setOpenId(opening ? m.id : null)

    if (opening && !m.is_read) {
      const { data } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', m.id)
        .select('id')
      if (data && data.length > 0) {
        setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, is_read: true } : x)))
      }
    }
  }

  const remove = async (id: string) => {
    if (!window.confirm('Delete this message? This cannot be undone.')) return
    setErrorMsg('')
    const { data } = await supabase.from('contact_messages').delete().eq('id', id).select('id')
    if (!data || data.length === 0) {
      setErrorMsg('Could not delete the message.')
      return
    }
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">Messages</h1>

      {errorMsg && <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</p>}

      {loading ? (
        <p className="py-10 text-center text-sm text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="rounded-2xl bg-white p-10 text-center text-sm text-gray-500">No messages yet.</p>
      ) : (
        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
          {messages.map((m) => {
            const open = openId === m.id
            return (
              <div key={m.id}>
                <button
                  onClick={() => toggle(m)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {!m.is_read && <span className="h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                    <div className="min-w-0">
                      <p className={'truncate text-sm ' + (m.is_read ? 'font-medium' : 'font-bold')}>{m.name}</p>
                      <p className="truncate text-xs text-gray-500">{m.email}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">
                    {new Date(m.created_at).toLocaleDateString('en-ZA')}
                  </span>
                </button>

                {open && (
                  <div className="px-5 pb-5">
                    <p className="whitespace-pre-wrap rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
                      {m.message}
                    </p>
                    {m.phone && <p className="mt-2 text-xs text-gray-500">Phone: {m.phone}</p>}
                    <div className="mt-3 flex gap-2">
                      <a
                        href={'mailto:' + m.email}
                        className="rounded-full bg-brand-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
                      >
                        Reply by Email
                      </a>
                      <button
                        onClick={() => remove(m.id)}
                        className="rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}