'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { LucideCalendar } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'

interface TaskFormValues {
  title: string
  description: string
  priority: string
  dueDate: string
  status: string
}

const CreateTaskForm = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [dueDate, setDueDate] = useState<Date | null>(null)

  const initialValues: TaskFormValues = {
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    status: ''
  }

  const validate = (values: TaskFormValues) => {
    const errors: Partial<TaskFormValues> = {}

    if (!values.title) {
      errors.title = 'Title is required'
    }

    if (!values.description) {
      errors.description = 'Description is required'
    }

    if (!values.priority) {
      errors.priority = 'Priority is required'
    }

    if (!values.dueDate) {
      errors.dueDate = 'Due date is required'
    }

    if (!values.status) {
      errors.status = 'Status is required'
    }

    return errors
  }

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      const token = localStorage.getItem('accessToken')

      const response = await fetch(
        'https://todo-app-api-dg8b.onrender.com/api/task/api/v1/tasks/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            priority: values.priority,
            dueDate: values.dueDate,
            status: values.status
          })
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to create task')
      }

      router.refresh()
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating task:', error)
      setServerError('Failed to create task. Please try again.')
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className='space-y-4 rounded-lg p-4 sm:p-2 lg:w-[1000px] lg:p-2'>
          <div className='space-y-2'>
            <Label className='text-white' htmlFor='title'>
              Title
            </Label>
            <Field
              name='title'
              type='text'
              as={Input}
              className='w-full rounded-full border-none bg-white/10 p-5 text-sm text-white sm:p-5 md:text-base'
              placeholder='Task title'
            />
            <ErrorMessage
              name='title'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          <div className='space-y-2'>
            <Label className='text-white' htmlFor='description'>
              Description
            </Label>
            <Field
              name='description'
              as='textarea'
              className='w-full rounded-lg border-none bg-white/10 px-5 py-2 text-sm text-white sm:p-4 md:text-base'
              placeholder='Task description'
            />
            <ErrorMessage
              name='description'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          <div className='space-y-2'>
            <Label className='text-white' htmlFor='priority'>
              Priority
            </Label>
            <Field name='priority'>
              {({ field, form }: { field: any; form: any }) => (
                <Select
                  onValueChange={value => form.setFieldValue('priority', value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger className='w-full rounded-full border-none bg-white/10 p-5 text-white sm:p-5 md:text-base'>
                    <SelectValue placeholder='Select priority' />
                  </SelectTrigger>
                  <SelectContent className='bg-white text-black'>
                    <SelectItem value='high'>High</SelectItem>
                    <SelectItem value='medium'>Medium</SelectItem>
                    <SelectItem value='low'>Low</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage
              name='priority'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          <div className='space-y-2'>
            <Label className='text-white' htmlFor='status'>
              Status
            </Label>
            <Field name='status'>
              {({ field, form }: { field: any; form: any }) => (
                <Select
                  onValueChange={value => form.setFieldValue('status', value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger className='w-full rounded-full border-none bg-white/10 p-5 text-white sm:p-5 md:text-base'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent className='bg-white text-black'>
                    <SelectItem value='pending'>Pending</SelectItem>
                    <SelectItem value='in_progress'>In Progress</SelectItem>
                    <SelectItem value='completed'>Completed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage
              name='status'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          <div className='space-y-2'>
            <Label className='text-white' htmlFor='dueDate'>
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'border-n one w-full justify-start rounded-full border-none bg-white/10 p-5 text-left text-white sm:p-5 md:text-base',
                    !dueDate && 'text-muted-foreground'
                  )}
                >
                  <LucideCalendar size={20} color='white' />
                  {dueDate ? (
                    format(dueDate, 'PPP')
                  ) : (
                    <span className='text-white'>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto bg-[#1e1e1e] p-0 text-white'>
                <Calendar
                  mode='single'
                  selected={dueDate || undefined}
                  onSelect={(dueDate: Date | undefined) => {
                    setDueDate(dueDate || null)
                    if (dueDate) {
                      setFieldValue('dueDate', format(dueDate, 'PPP'))
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <ErrorMessage
              name='dueDate'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          {serverError && <p className='text-sm text-red-500'>{serverError}</p>}

          <div className='flex flex-col gap-4 sm:flex-row'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full rounded-full bg-blue-500 p-5 text-white hover:bg-blue-600'
            >
              Create Task
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.back()}
              className='w-full rounded-full bg-white p-5 text-black hover:bg-gray-200'
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CreateTaskForm
