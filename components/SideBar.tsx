'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Image from 'next/image'

const Sidebar = () => {
  const [userType, setUserType] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Fetch the user type from localStorage or an API
    const storedUserType = localStorage.getItem('userType')
    setUserType(storedUserType)
  }, [])

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('userType')
    localStorage.removeItem('name')
    localStorage.removeItem('username')
    setUserType(null)

    // Redirect to login page
    router.push('/')
  }

  const toggleSidebar = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <Button
        className='fixed right-4 top-4 z-50 rounded p-1 md:hidden'
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <Image src='/close.svg' alt='Close menu' width={24} height={24} />
        ) : (
          <Image src='/menu.svg' alt='Open menu' width={24} height={24} />
        )}
      </Button>

      <aside
        className={`fixed left-0 top-0 flex h-full w-64 transform flex-col bg-gradient-to-t from-[#02298a] to-[#0575e6] p-4 text-white transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:w-64 md:translate-x-0`}
        style={{ height: '100vh', overflowY: 'scroll' }} // Ensuring full height with scroll
      >
        <div className='flex h-full flex-col'>
          {/* Sidebar Header */}
          <div className='flex-grow'>
            <h2 className='mb-6 text-xl font-bold'>DashZone</h2>

            {/* Sidebar Links */}
            <ul className='space-y-4'>
              {userType === 'admin' && (
                <>
                  <li>
                    <Link
                      href='/admin-dashboard'
                      className='block rounded-full px-4 py-2 hover:bg-gray-700'
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/admin/settings'
                      className='block rounded-full px-4 py-2 hover:bg-gray-700'
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
                      href='/editor-dashboard'
                      className='block rounded-full px-4 py-2 hover:bg-gray-700'
                    >
                      Editor Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/editor/settings'
                      className='block rounded-full px-4 py-2 hover:bg-gray-700'
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
                      href='/viewer-dashboard'
                      className='block rounded-full px-4 py-2 hover:bg-gray-700'
                    >
                      Viewer Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/viewer/settings'
                      className='block rounded-full px-4 py-2 hover:bg-gray-700'
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
          </div>

          {/* Logout Button */}
          {userType && (
            <div className='mt-auto'>
              <Button
                onClick={handleLogout}
                className='block w-full rounded-full bg-red-600 px-4 py-2 hover:bg-red-500'
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
