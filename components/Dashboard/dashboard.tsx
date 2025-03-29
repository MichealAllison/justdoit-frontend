'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import PriorityCard from './components/priorityCard'
import { Button } from '../ui/button'
import { LucidePlus } from 'lucide-react'

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

  useEffect(() => {
    setLoading(false)
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen w-full overflow-hidden'>
      {/* Welcome message */}
      <div className='static flex flex-col py-4 sm:py-6'>
        <h1 className='text-xl font-bold text-white sm:text-2xl'>
          Welcome Chris
        </h1>
        <div className='flex flex-wrap gap-2 sm:gap-4'>
          <p className='text-sm text-gray-400'>Today's Progress</p>
          <p className='text-sm text-blue-500'>5 tasks left</p>
        </div>
      </div>

      <div>
        <div className='mt-6 w-full'>
          <div className='mb-4 flex items-center justify-between'>
            <p className='text-lg font-bold text-white sm:text-xl'>
              Recent Tasks
            </p>
            <Link
              href='/priority-tasks'
              className='text-sm text-blue-500 hover:text-blue-700'
            >
              View all
            </Link>
          </div>
          <div className='mt-1'>
            <div className='flex gap-4 overflow-x-auto pb-2'>
              {priority.map((item, index) => (
                <div key={index} className='flex-shrink-0'>
                  <PriorityCard
                    priority={item.priority}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-8 w-full'>
          <div className='flex items-center justify-between'>
            <p className='text-xl font-bold text-white'>Priority Tasks</p>
            <Link href='/priority-tasks' className='text-sm text-blue-500'>
              View all
            </Link>
          </div>
          <div className='mt-4'>
            <div className='flex gap-4 overflow-x-auto pb-2'>
              {priority.map((item, index) => (
                <div key={index} className='flex-shrink-0'>
                  <PriorityCard
                    priority={item.priority}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button className='fixed bottom-6 right-6 h-14 w-14 animate-pulse rounded-full bg-blue-500 shadow-lg shadow-blue-500/70'>
        <LucidePlus color='white' size={20} />
      </Button>
    </div>
  )
}

export default Dashboard
