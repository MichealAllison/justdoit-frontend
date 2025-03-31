'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PriorityCard from './components/priorityCard'
import { Button } from '../ui/button'
import { LucidePlus } from 'lucide-react'
import { taskData } from './data/taskData'
import { useEffect, useState } from 'react'
import axios from 'axios'
import UserList from './components/UserList'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [Name, setName] = useState('')
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://todo-app-api-dg8b.onrender.com/api/user/users/'
        )
        console.log('API Response:', response.data)
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className='min-h-screen w-full overflow-hidden'>
      {/* Welcome message */}
      <div className='static flex flex-col py-4 sm:py-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold text-white sm:text-2xl'>
            Welcome
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user: any) => (
                <span className='ml-2' key={user.id}>
                  {user.name || user.username || JSON.stringify(user)}
                </span>
              ))
            ) : (
              <span>No users found</span>
            )}
          </h1>
        </div>
        <div className='flex flex-wrap gap-2 sm:gap-4'>
          <p className='text-sm text-gray-400'>Today's Progress</p>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-blue-500'>
              {taskData.filter(task => task.status === 'In Progress').length}
            </p>
            <p className='text-sm text-blue-500'>tasks left</p>
          </div>
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
            <div className='scrollbar-hide flex gap-4 overflow-x-auto pb-2'>
              {taskData.map((item, index) => (
                <div key={index} className='flex-shrink-0'>
                  <PriorityCard
                    status={item.status}
                    priority={item.priority}
                    title={item.title}
                    description={item.description}
                    dueDate={item.dueDate}
                    category={item.category}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-8 w-full'>
          <UserList />
        </div>

        <div className='mt-8 w-full'>
          <div className='flex items-center justify-between'>
            <p className='text-xl font-bold text-white'>All Tasks</p>
            <Link href='/priority-tasks' className='text-sm text-blue-500'>
              View all
            </Link>
          </div>
          <div className='mt-4'>
            <div className='scrollbar-hide flex gap-4 overflow-x-auto pb-2'>
              {taskData.map((item, index) => (
                <div key={index} className='flex-shrink-0'>
                  <PriorityCard
                    status={item.status}
                    priority={item.priority}
                    title={item.title}
                    description={item.description}
                    dueDate={item.dueDate}
                    category={item.category}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button
        className='fixed bottom-6 right-6 h-14 w-14 animate-pulse rounded-full bg-blue-500 shadow-lg shadow-blue-500/70'
        onClick={() => router.push('/create-task')}
      >
        <LucidePlus color='white' size={20} />
      </Button>
    </div>
  )
}

export default Dashboard
