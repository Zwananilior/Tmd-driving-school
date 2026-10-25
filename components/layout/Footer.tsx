import Link from 'next/link'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Our Courses' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
]

const socials = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6 5.82c-1.02-.9-1.6-2.2-1.6-3.62h-3.4v13.3a2.7 2.7 0 1 1-2.7-2.7c.3 0 .58.05.85.13V9.4a6.1 6.1 0 1 0 5.25 6.03V9.8a7.5 7.5 0 0 0 4.4 1.4V7.8c-.99 0-1.94-.28-2.8-.78-.02-.4-.02-.8 0-1.2z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22.5 7.2a2.5 2.5 0 0 0-1.8-1.8C19.2 5 12 5 12 5s-7.2 0-8.7.4A2.5 2.5 0 0 0 1.5 7.2C1.1 8.7 1.1 12 1.1 12s0 3.3.4 4.8a2.5 2.5 0 0 0 1.8 1.8C4.8 19 12 19 12 19s7.2 0 8.7-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8z" />
        <polygon points="10 9 15 12 10 15 10 9" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="leading-none">
          <span className="block text-2xl font-extrabold tracking-tight text-white">TMD</span>
          <span className="block text-[10px] tracking-[0.25em] text-brand-400">DRIVING SCHOOL</span>
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-4">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="text-gray-300 hover:text-brand-400 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-2 text-xs text-gray-400 md:flex-row md:items-center md:justify-between">
          <span>© 2026 TMD Driving School. All rights reserved.</span>
           <span className="flex gap-4">
		     <Link 
			 href="/terms"
			 className="hover:text-white underline-offset-2 hover:underline transition-colors">
			  Terms and Conditions
			 </Link>
			 <Link href="/privacy"
			 className="hover:text-white underline-offset-2 hover:underline transition-colors">
			 Privacy Policy
			 </Link>
		   </span>
        </div>
      </div>
    </footer>
  )
}