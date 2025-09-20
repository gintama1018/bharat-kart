'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<void>
  signInWithPhone: (phone: string) => Promise<void>
  verifyOTP: (phone: string, otp: string) => Promise<void>
  signOut: () => Promise<void>
  sendEmailOTP: (email: string) => Promise<void>
  verifyEmailOTP: (email: string, otp: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      toast.success('Successfully signed in!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      toast.success('Check your email for verification link!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const signInWithPhone = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
      })
      if (error) throw error
      toast.success('OTP sent to your phone!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const verifyOTP = async (phone: string, otp: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: 'sms',
      })
      if (error) throw error
      toast.success('Phone verified successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const sendEmailOTP = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      })
      if (error) throw error
      toast.success('OTP sent to your email!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const verifyEmailOTP = async (email: string, otp: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email',
      })
      if (error) throw error
      toast.success('Email verified successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Signed out successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithPhone,
        verifyOTP,
        signOut,
        sendEmailOTP,
        verifyEmailOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}