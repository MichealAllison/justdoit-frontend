'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Change import if using app router

const Sidebar = () => {
  const [userType, setUserType] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Fetch the user type from localStorage or an API
    const storedUserType = localStorage.getItem('userType')
    setUserType(storedUserType)
  }, [])

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('userType')
    setUserType(null)

    // Redirect to login page or home page
    router.push('/')
  }

  return (
    <aside className='h-screen w-64 bg-gradient-to-t from-[#02298a] to-[#0575e6] p-4 text-white'>
      <h2 className='mb-6 text-xl font-bold'>Dashboard</h2>
      <ul className='space-y-4'>
        {userType === 'admin' && (
          <>
            <li>
              <Link
                href='/admindashboard'
                className='block rounded px-4 py-2 hover:bg-gray-700'
              >
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                href='/admin/settings'
                className='block rounded px-4 py-2 hover:bg-gray-700'
              >
                Admin Settings
              </Link>
            </li>
          </>
        )}

        {userType === 'editor' && (
          <>
            <li>
              <Link
                href='/editordashboard'
                className='block rounded px-4 py-2 hover:bg-gray-700'
              >
                Editor Dashboard
              </Link>
            </li>
            <li>
              <Link
                href='/editor/settings'
                className='block rounded px-4 py-2 hover:bg-gray-700'
              >
                Editor Settings
              </Link>
            </li>
          </>
        )}

        {userType === 'viewer' && (
          <>
            <li>
              <Link
                href='/viewerdashboard'
                className='block rounded px-4 py-2 hover:bg-gray-700'
              >
                Viewer Dashboard
              </Link>
            </li>
            <li>
              <Link
                href='/viewer/settings'
                className='block rounded px-4 py-2 hover:bg-gray-700'
              >
                Viewer Settings
              </Link>
            </li>
          </>
        )}

        {!userType && (
          <li>
            <p className='block rounded px-4 py-2'>Loading...</p>
          </li>
        )}
      </ul>
      {userType && (
        <button
          onClick={handleLogout}
          className='mt-6 block w-full rounded bg-red-600 px-4 py-2 hover:bg-red-500'
        >
          Logout
        </button>
      )}
    </aside>
  )
}

export default Sidebar
