'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = false // Replace with actual authentication logic
    if (!isAuthenticated) {
      router.push('/Home') // Redirect to login if not authenticated
    }
  }, [router])

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
    </div>
  )
}
