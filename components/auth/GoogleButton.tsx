'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function GoogleButton({ redirectTo = '/' }: { redirectTo?: string }) {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleClick = async () => {
    setLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + redirectTo },
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    }
    
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.55 5.55 0 0 1-2.4 3.64v3h3.87c2.27-2.09 3.58-5.17 3.58-8.83z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.9l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11A11.997 11.997 0 0 0 12 24z" />
          <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.6H1.28a12 12 0 0 0 0 10.8l3.99-3.11z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.6l3.99 3.11C6.22 6.86 8.87 4.75 12 4.75z" />
        </svg>
        {loading ? 'Connecting...' : 'Continue with Google'}
      </button>
      {errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}
    </div>
  )
}