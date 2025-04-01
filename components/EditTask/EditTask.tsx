'use client'

import React, { useState } from 'react'
import EditTaskForm from './components/EditTaskForm'
import { LucideArrowLeft, LucideTrash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import DeleteModal from './components/DeleteModal'

const EditTask = () => {
  const { id } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)

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
        setOpen(false)
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

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className='mt-20 flex items-center gap-2'>
              <Button
                variant='default'
                size='sm'
                className='rounded-full bg-red-500 p-5 text-white hover:bg-red-600'
              >
                <LucideTrash size={20} color='white' />
                <p className='text-sm text-white'>Delete</p>
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DeleteModal setOpen={setOpen} handleDelete={handleDelete} />
          </DialogContent>
        </Dialog>
      </div>
      <div className='mt-5'>
        <EditTaskForm />
      </div>
    </div>
  )
}

export default EditTask
