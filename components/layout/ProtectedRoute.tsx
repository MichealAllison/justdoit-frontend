'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const accessToken =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

    if (!accessToken) {
      setIsAuth(false)
      router.push('/login')
    } else {
      setIsAuth(true)
    }
  }, [router])

  if (isAuth === null) return null

  return isAuth ? <>{children}</> : null
}

export default ProtectedRoute
