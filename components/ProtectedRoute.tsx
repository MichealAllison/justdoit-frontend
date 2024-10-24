'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Ensure the component is mounted in the client
    setIsMounted(true)

    // Perform authentication logic only after the component is mounted
    const isAuthenticated =
      typeof window !== 'undefined' && localStorage.getItem('userType')
    if (!isAuthenticated) {
      router.push('/') // Redirect to login if not authenticated
    }
  }, [router])

  // Prevent rendering if it's not mounted yet
  if (!isMounted) return null

  return <>{children}</>
}

export default ProtectedRoute
