'use client'

import React from 'react'
import EditTaskForm from './components/EditTaskForm'
import { LucideArrowLeft, LucideTrash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const EditTask = () => {
  const { id } = useParams()
  const router = useRouter()

  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken')

    try {
      const response = await fetch(
        `https://todo-app-api-dg8b.onrender.com/api/task/api/v1/tasks/${id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.ok) {
        router.push('/dashboard')
      } else {
        console.error('Failed to delete the task.')
      }
    } catch (error) {
      console.error('Error while deleting the task:', error)
    }
  }

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <a href='/dashboard'>
            <LucideArrowLeft size={20} color='white' />
          </a>
          <h1 className='text-2xl font-bold text-white'>Edit Task</h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='destructive' size='sm' onClick={handleDelete}>
            <LucideTrash size={20} color='red' />
          </Button>
        </div>
      </div>
      <div className='mt-5'>
        <EditTaskForm />
      </div>
    </div>
  )
}

export default EditTask
