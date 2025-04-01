'use client'
import axios from 'axios'
import { Task } from './Dashboard/type'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TaskCard from './Dashboard/components/taskcard'

const AllTask = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const router = useRouter()

  useEffect(() => {
    const fetchTasks = async () => {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        console.error('No access token found')
        return
      }
      const response = await axios.get(
        'https://todo-app-api-dg8b.onrender.com/api/task/api/v1/tasks/',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      setTasks(response.data)
    }
    fetchTasks()
  }, [])
  return (
    <div>
      <div className='static flex flex-col py-4 sm:py-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold text-white sm:text-2xl'>
            All Tasks
          </h1>
        </div>
        <div className='flex flex-wrap gap-2 sm:gap-4'>
          <p className='text-sm text-gray-400'>Today's Progress</p>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-blue-500'>{tasks.length}</p>
            <p className='text-sm text-blue-500'>tasks</p>
          </div>
        </div>
      </div>
      <div className='mt-6 w-full'>
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
    </div>
  )
}

export default AllTask
