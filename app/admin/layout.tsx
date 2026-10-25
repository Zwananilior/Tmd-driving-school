'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'

const links = [
                 { href: '/admin', label:'Dashboard'},
				 { href: '/admin/bookings', label: 'Bookings'},
				 { href: '/admin/messages', label: 'Messages'},
				 { href: '/admin/packages', label: 'Packages'},
              ]
			  
export default function AdminLayout({ children } : { children: React.ReactNode }){
      const { user, role, loading } = useAuth()
      const router = useRouter()
      const pathname = usePathname()
	  
	  const allowed = !!user && role === 'admin'
	  
	  useEffect(() =>{
	     if(!loading && !allowed) router.replace('/')
	  }, [loading,allowed,router])
	  
	  if(loading || !allowed){
	  return
	  <p className="py-24 text-center text-sm text-gray-500">Checking access...</p>
	  }
	  
	  return(
	   <div className="flex flex-1 flex-col md:flex-row bg-gray-50">
	     <aside className="bg-navy-900 text-gray-300 md:w-56 md:shrink-0">
		   <p className="hidden px-5 pt-6 pb-2 text-sm uppercase tracking-widest text-brand-400 md:block">
		    Admin
		   </p>
		   <nav className="flex gap-1 overflow-autoo p-3 md:flex-col">
		    {links.map((l) =>{
			  const active = pathname === l.href
			  return (
			    <Link 
				key={l.href}
				href="{l.href}"
				className={
                  'whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ' +
                  (active ? 'bg-brand-500 text-white' : 'hover:bg-white/10')
                }
				>
				  {l.label}
				</Link>
			  )
			})}
		   </nav>
		 </aside>
		 <div className="min-w-0 flex-1 p-5  md:p-10">{children}</div>
	   </div>
	  )
}			  