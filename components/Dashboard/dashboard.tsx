'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import PriorityCard from '../Dashboard/components/priorityCard'

// Priority task data
const priority = [
  {
    priority: 'High',
    title: 'Create a new Bank Savings Account',
    description: 'Create a new Bank Savings Account for the user',
    date: '03/28/2025'
  },
  {
    priority: 'Low',
    title: 'Create a new Bank Savings Account',
    description: 'Create a new Bank Savings Account for the user',
    date: '03/28/2025'
  },
  {
    priority: 'Medium',
    title: 'Create a new Bank Savings Account',
    description: 'Create a new Bank Savings Account for the user',
    date: '03/28/2025'
  }
]

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Effect to handle authentication (disabled for development)
  useEffect(() => {
    setLoading(false)

    /* Original authentication logic - commented out for development
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('userType')
      const isAuthenticated = !!userType

      if (!isAuthenticated || userType !== 'viewer') {
        router.push('/')
      } else {
        setLoading(false)
      }
    }
    */
  }, [router])

  // Loading state
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='h-screen w-full'>
      {/* Welcome and Progress */}
      <div className='flex flex-col overflow-hidden'>
        <h1 className='text-2xl font-bold text-white'>Welcome Chris</h1>
        <div className='flex gap-5'>
          <p className='text-[#c9cbcc]'>Today's Progress</p>
          <p className='text-[#007bff]'>5 tasks left</p>
        </div>
      </div>

      {/* Priority Tasks */}
      <div className='mt-10 w-full md:w-[500px]'>
        <div className='flex items-center justify-between'>
          <p className='text-xl font-bold text-white'>Priority Tasks</p>
          <Link href='/priority-tasks' className='text-sm text-[#007bff]'>
            View all
          </Link>
        </div>
        <div className='scrollbar-hide mt-5 flex gap-5 overflow-y-auto'>
          {priority.map((item, index) => (
            <PriorityCard
              key={index}
              priority={item.priority}
              title={item.title}
              description={item.description}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
