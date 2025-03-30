'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(true) // Set default to true for development
  const router = useRouter()

  // Temporarily comment out the authentication check during development
  /*
  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null

    if (!token) {
      setIsAuth(false)
      router.push('/dashboard')
    } else {
      setIsAuth(true)
    }
  }, [router])
  */

  // Prevent rendering until authentication is checked
  if (isAuth === null) return null

  return <>{children}</>
}

export default ProtectedRoute
