'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { LucideX, LucideMenu } from 'lucide-react'

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
        className='fixed right-4 top-4 z-50 rounded bg-blue-500 px-2 py-2 md:hidden'
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <LucideX color='white' size={32} />
        ) : (
          <LucideMenu color='white' size={32} />
        )}
      </Button>

      <aside
        className={`fixed left-0 top-0 flex h-full w-64 transform flex-col bg-gradient-to-t from-[#02298a] to-[#053667] p-4 text-white transition-transform ${
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
              <>
                <li>
                  <Link
                    href='/dashboard'
                    className='block rounded-full px-4 py-2 hover:bg-[#1e1e1e]'
                  >
                    Task Manager
                  </Link>
                </li>
                <li>
                  <Link
                    href='/dashboard/all-tasks'
                    className='block rounded-full px-4 py-2 hover:bg-[#1e1e1e]'
                  >
                    All Tasks
                  </Link>
                </li>
                <li>
                  <Link
                    href='/dashboard/completed-tasks'
                    className='block rounded-full px-4 py-2 hover:bg-[#1e1e1e]'
                  >
                    Completed Tasks
                  </Link>
                </li>
              </>
            </ul>
          </div>

          {/* Logout Button */}

          <div className='mt-auto'>
            <Button
              onClick={handleLogout}
              className='block w-full rounded-full bg-red-600 px-4 py-2 hover:bg-red-500'
            >
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
