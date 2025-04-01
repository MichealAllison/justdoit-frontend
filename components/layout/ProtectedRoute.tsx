'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const accessToken =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

    if (!accessToken) {
      setIsAuth(false)
      router.push('/login')
    } else {
      setIsAuth(true)
      if (pathname === '/login') {
        router.push('/dashboard')
      }
    }
  }, [router, pathname])

  if (isAuth === null) return null

  return isAuth ? <>{children}</> : null
}

export default ProtectedRoute
