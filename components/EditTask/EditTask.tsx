'use client'

import React from 'react'
import EditTaskForm from './components/EditTaskForm'
import { LucideArrowLeft } from 'lucide-react'
import { useParams } from 'next/navigation'

const EditTask = () => {
  const { id } = useParams()
  return (
    <div className='w-full'>
      <div className='flex items-center gap-2'>
        <a href='/dashboard'>
          <LucideArrowLeft size={20} color='white' />
        </a>
        <h1 className='text-2xl font-bold text-white'>Edit Task</h1>
      </div>
      <div className='mt-5'>
        <EditTaskForm />
      </div>
    </div>
  )
}

export default EditTask
