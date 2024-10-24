'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true) // Initialize loading state
  const router = useRouter()

  useEffect(() => {
    const userType =
      typeof window !== 'undefined' && localStorage.getItem('userType')

    // Simulate the auth check
    if (!userType || userType !== 'admin') {
      // If not authenticated or user is not admin, redirect to login
      router.push('/')
    } else {
      setLoading(false) // Stop loading once authenticated
    }
  }, [router])

  if (loading) {
    return <div>Loading...</div> // Show a loading state while checking authentication
  }

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
    </div>
  )
}
