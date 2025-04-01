'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TaskCard from './components/taskcard'
import { Button } from '../ui/button'
import { LucidePlus } from 'lucide-react'
import { fetchTasks } from './data/taskData'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Task } from './type'
interface User {
  id: number
  username: string
  email: string
  name?: string
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])

  const router = useRouter()

  // Helper function to decode JWT token
  const decodeJWT = (token: string) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
          console.error('No access token found')
          return
        }

        const decodedToken = decodeJWT(accessToken)
        const userId = decodedToken?.user_id || decodedToken?.sub

        const response = await axios.get(
          'https://todo-app-api-dg8b.onrender.com/api/user/users/',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        if (Array.isArray(response.data) && response.data.length > 0) {
          if (userId) {
            // Try to find user by ID from token
            const currentUser = response.data.find(
              (u: User) => u.id === userId || u.id === Number(userId)
            )

            if (currentUser) {
              setUser(currentUser)
            } else {
              // If not found by ID, use the first user
              setUser(response.data[0])
            }
          } else {
            // If no user ID in token, use the first user
            setUser(response.data[0])
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    const loadTasks = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
          console.error('No access token found')
          return
        }

        const fetchedTasks = await fetchTasks()
        setTasks(fetchedTasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
    loadTasks()
  }, [])
  return (
    <div className='min-h-screen w-full overflow-hidden'>
      {/* Welcome message */}
      <div className='static flex flex-col py-4 sm:py-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold text-white sm:text-2xl'>
            Welcome
            {user ? (
              <span className='ml-2'>
                {user.name || user.username || 'User'}
              </span>
            ) : (
              <span>{loading ? '' : 'User'}</span>
            )}
          </h1>
        </div>
        <div className='flex flex-wrap gap-2 sm:gap-4'>
          <p className='text-sm text-gray-400'>Today's Progress</p>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-blue-500'>
              {tasks.filter(task => task.status === 'in_progress').length}
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
              href='/all-tasks'
              className='text-sm text-blue-500 hover:text-blue-700'
            >
              View all
            </Link>
          </div>
          <div className='mt-1'>
            <div className='scrollbar-hide flex gap-4 overflow-x-auto pb-2'>
              {tasks.map((item, index) => (
                <div key={item.id} className='flex-shrink-0'>
                  <TaskCard
                    status={item.status}
                    priority={item.priority}
                    title={item.title}
                    description={item.description}
                    due_date={item.due_date}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-8 w-full'>
          <div className='flex items-center justify-between'>
            <p className='text-xl font-bold text-white'>All Tasks</p>
            <Link href='/all-tasks' className='text-sm text-blue-500'>
              View all
            </Link>
          </div>
          <div className='mt-4'>
            <div className='scrollbar-hide flex gap-4 overflow-x-auto pb-2'>
              {tasks.map((item, index) => (
                <div key={item.id} className='flex-shrink-0'>
                  <TaskCard
                    status={item.status}
                    priority={item.priority}
                    title={item.title}
                    description={item.description}
                    due_date={item.due_date}
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
