'use client'

import Link from 'next/link'
import supabase } from '@/lib/supabase'

export default function AdminDashboard(){
   const [stats, setStats] = useState({ paidPending: 0, upcoming: 0, unread: 0, packages: 0 })
   const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const count = { count: 'exact' as const, head: true }
      const [a, b, c, d] = await Promise.all([
        supabase.from('bookings').select('*', count).eq('payment_status', 'paid').eq('status', 'pending'),
        supabase.from('bookings').select('*', count).eq('status', 'confirmed'),
        supabase.from('contact_messages').select('*', count).eq('is_read', false),
        supabase.from('packages').select('*', count),
      ])
      setStats({
        paidPending: a.count ?? 0,
        upcoming: b.count ?? 0,
        unread: c.count ?? 0,
        packages: d.count ?? 0,
      })
      setLoading(false)
    }
    load()
  }, [])

  const cards = [
    { label: 'Paid, awaiting confirmation', value: stats.paidPending, href: '/admin/bookings' },
    { label: 'Confirmed bookings', value: stats.upcoming, href: '/admin/bookings' },
    { label: 'Unread messages', value: stats.unread, href: '/admin/messages' },
    { label: 'Packages', value: stats.packages, href: '/admin/packages' },
  ]
  
  return(
  <div>
  <h1 className="mb-6 text-2xl font-extrabold text-navy-900">Dashboard</h1>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
   {cards.map((c) =>(
     <Link
	 key={c.href}
	 href={c.href}
	 className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
	   <p className="text-3xl font-extrabold text-navy-900">{loading ? '-' : c.value}</p>
	   <p className="mt-1 text-xs text-gray-500">{c.label}</p>
	 </Link>
   ))}
  </div>
  </div>
  )
}