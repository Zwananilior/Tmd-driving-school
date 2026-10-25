'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  role: string | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)
  const [roleChecked, setRoleChecked] = useState(false)

  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setSessionLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setSessionLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) {
      setRole(null)
      setRoleChecked(true)
      return
    }

    let cancelled = false
    setRoleChecked(false)

    const loadRole = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle()

      if (cancelled) return
      setRole(data?.role ?? 'student')
      setRoleChecked(true)
    }

    loadRole()
    return () => {
      cancelled = true
    }
  }, [userId])

  const signOut = async () => {
    await supabase.auth.signOut()
    setRole(null)
  }

  
  const loading = sessionLoading || !roleChecked

  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}