import React from 'react'
import CreateTaskForm from './components/CreateTaskForm'
import { LucideArrowLeft } from 'lucide-react'

const CreateTask = () => {
  return (
    <div className='w-full'>
      <div className='flex items-center gap-2'>
        <a href='/dashboard'>
          <LucideArrowLeft size={20} color='white' />
        </a>
        <h1 className='text-2xl font-bold text-white'>Create Task</h1>
      </div>
      <div className='mt-5'>
        <CreateTaskForm />
      </div>
    </div>
  )
}

export default CreateTask
