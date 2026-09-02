import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { getProfile, signIn as dataSignIn, signOut as dataSignOut, signUp as dataSignUp } from './data'
import type { Profile } from './types'

interface AuthValue {
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<Profile | null>
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ profile: Profile | null; needsConfirmation: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getProfile().then((p) => {
      if (!cancelled) {
        setProfile(p)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const p = await dataSignIn(email, password)
    setProfile(p)
    return p
  }, [])

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    const res = await dataSignUp(email, password, fullName)
    if (res.profile) setProfile(res.profile)
    return res
  }, [])

  const signOut = useCallback(async () => {
    await dataSignOut()
    setProfile(null)
  }, [])

  const value = useMemo(
    () => ({ profile, loading, signIn, signUp, signOut }),
    [profile, loading, signIn, signUp, signOut]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
