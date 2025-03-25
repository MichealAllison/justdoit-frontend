'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null

    if (!token) {
      setIsAuth(false)
      router.push('/') // Redirect to login if not authenticated
    } else {
      setIsAuth(true)
    }
  }, [router])

  // Prevent rendering until authentication is checked
  if (isAuth === null) return null

  return <>{children}</>
}

export default ProtectedRoute
