'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ViewerDashboard() {
  const [loading, setLoading] = useState(true) // State to handle loading
  const router = useRouter()

  useEffect(() => {
    // Ensure we're in the browser to access localStorage
    if (typeof window !== 'undefined') {
      // Get the user type from localStorage
      const userType = localStorage.getItem('userType')
      const isAuthenticated = !!userType // Check if userType exists

      // If not authenticated or user is not a viewer, redirect to login or homepage
      if (!isAuthenticated || userType !== 'viewer') {
        router.push('/') // Redirect to login page
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
      <h1>Welcome to the Viewer Dashboard</h1>
    </div>
  )
}
