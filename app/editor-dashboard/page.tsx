'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditorDashboard() {
  const [loading, setLoading] = useState(true) // State to manage loading
  const router = useRouter()

  useEffect(() => {
    // Ensure we're in the browser (to access localStorage)
    if (typeof window !== 'undefined') {
      // Simulate getting the auth status and user type from localStorage
      const userType = localStorage.getItem('userType')
      const isAuthenticated = !!userType // Check if userType exists

      // If not authenticated or user is not an editor, redirect to login or homepage
      if (!isAuthenticated || userType !== 'editor') {
        router.push('/') // Redirect to login page if user is not editor
      } else {
        setLoading(false) // If authenticated, stop loading
      }
    }
  }, [router])

  if (loading) {
    // Display loading state while authentication is being checked
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Welcome to the Editor Dashboard</h1>
    </div>
  )
}
