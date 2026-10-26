'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/lib/AuthContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Our Courses' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, role, signOut } = useAuth()

  const fullName = (user?.user_metadata?.full_name as string) || ''
  const initials = fullName.trim()
    ? fullName.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase()
    : (user?.email?.[0] || '').toUpperCase()

  return (
    <header className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="leading-none">
          <span className="block text-2xl font-extrabold tracking-tight text-white">TMD</span>
          <span className="block text-[10px] tracking-[0.25em] text-brand-400">DRIVING SCHOOL</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1 transition-colors ${
                  active ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 bg-brand-500 transition-all duration-300 ${
                    active ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-4">
              {role === 'admin' && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-brand-400 hover:text-white transition-colors"
                >
                  Admin
                </Link>
              )}
              <span
                title={user.email || ''}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white"
              >
                {initials}
              </span>
              <button
                onClick={signOut}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              aria-label="Account"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          )}

          <Link
            href="/booking"
            className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            Book a Lesson
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[32rem]' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium ${
                pathname === link.href ? 'text-brand-400' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <div className="flex items-center gap-3">
                <span
                  title={user.email || ''}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white"
                >
                  {initials}
                </span>
                <span className="truncate text-sm text-gray-300">{user.email}</span>
              </div>

              {role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-brand-400"
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={() => {
                  setMenuOpen(false)
                  signOut()
                }}
                className="text-left text-sm font-medium text-gray-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-300"
            >
              Log In
            </Link>
          )}

          <Link
            href="/booking"
            onClick={() => setMenuOpen(false)}
            className="bg-brand-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center"
          >
            Book a Lesson
          </Link>
        </nav>
      </div>
    </header>
  )
}
