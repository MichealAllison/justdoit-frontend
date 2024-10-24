'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditorDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Simulate getting the auth status and user type from localStorage
    const isAuthenticated =
      typeof window !== 'undefined' && localStorage.getItem('userType')
    const userType =
      typeof window !== 'undefined' && localStorage.getItem('userType')

    // If not authenticated or user is not an admin, redirect to login or homepage
    if (!isAuthenticated || userType !== 'editor') {
      router.push('/') // Redirect to login or a designated page
    }
  }, [router])

  return (
    <div>
      <h1>Welcome to the Editor Dashboard</h1>
    </div>
  )
}
