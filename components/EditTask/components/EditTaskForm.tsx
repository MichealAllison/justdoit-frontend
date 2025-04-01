'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
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
import { Task, TaskList } from '@/components/Dashboard/type'
import { fetchTasks } from '@/components/Dashboard/data/taskData'
import axios, { AxiosError } from 'axios'
interface TaskFormValues {
  title: string
  description: string
  priority: string
  due_date: string
  status: string
}

const EditTaskForm = () => {
  const router = useRouter()
  const { id } = useParams() // Get the ID from URL params
  const [serverError, setServerError] = useState<string | null>(null)
  const [tasks, setTasks] = useState<TaskList>([])
  const [loading, setLoading] = useState(true)
  const [initialValues, setInitialValues] = useState<TaskFormValues>({
    title: '',
    description: '',
    priority: '',
    due_date: '',
    status: ''
  })

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks()
        setTasks(fetchedTasks)

        if (id && fetchedTasks.length > 0) {
          const task = fetchedTasks.find(
            task => task.id === parseInt(id as string)
          )
          if (task) {
            setInitialValues({
              title: task.title,
              description: task.description,
              priority:
                task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
              due_date: task.due_date,
              status: task.status
            })

            // Set due date if available
            if (task.due_date) {
              setDueDate(new Date(task.due_date))
            }
          }
        }
      } catch (error) {
        console.error('Error loading tasks:', error)
        setServerError('Failed to load task data')
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [id])

  const validate = (values: TaskFormValues) => {
    const errors: Partial<TaskFormValues> = {}
    if (!values.title) errors.title = 'Title is required'
    if (!values.description) errors.description = 'Description is required'
    if (!values.priority) errors.priority = 'Priority is required'
    if (!values.due_date) errors.due_date = 'Due date is required'
    if (!values.status) errors.status = 'Status is required'
    return errors
  }

  const [dueDate, setDueDate] = useState<Date | null>(null)

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      const token = localStorage.getItem('accessToken')

      const response = await fetch(
        `https://todo-app-api-dg8b.onrender.com/api/task/api/v1/tasks/${id}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            priority: values.priority.toLowerCase(),
            due_date: values.due_date,
            status: values.status
          })
        }
      )

      if (response.status === 200) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error(
        'Error updating task:',
        (error as AxiosError)?.response?.data || (error as Error).message
      )
      setServerError('Failed to update task. Please try again.')
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className='space-y-4 rounded-lg p-4 sm:p-2 lg:w-[1000px] lg:p-2'>
          <div className='space-y-2'>
            <Label className='text-white'>Title</Label>
            <Field
              name='title'
              type='text'
              as={Input}
              placeholder='Task title'
              className='w-full rounded-full border-none bg-white/10 p-5 text-sm text-white sm:p-5 md:text-base'
            />
            <ErrorMessage name='title' component='p' className='text-red-500' />
          </div>

          <div className='space-y-2'>
            <Label className='text-white'>Description</Label>
            <Field
              name='description'
              as='textarea'
              className='w-full rounded-lg border-none bg-white/10 px-5 py-2 text-sm text-white sm:p-4 md:text-base'
              placeholder='Task description'
            />
            <ErrorMessage
              name='description'
              component='p'
              className='text-red-500'
            />
          </div>

          <div className='space-y-2'>
            <Label className='text-white'>Priority</Label>
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
                    <SelectItem value='High'>High</SelectItem>
                    <SelectItem value='Medium'>Medium</SelectItem>
                    <SelectItem value='Low'>Low</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </Field>
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
            <Label className='text-white'>Due Date</Label>
            <Field name='due_date'>
              {({ field, form }: { field: any; form: any }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className={cn(
                        'w-full justify-start rounded-full border-none bg-white/10 p-5 text-left text-white sm:p-5 md:text-base',
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
                  <PopoverContent className='w-auto bg-white p-0 text-black'>
                    <Calendar
                      mode='single'
                      selected={dueDate || undefined}
                      onSelect={(day: Date | undefined) => {
                        setDueDate(day || null)
                        if (day) {
                          const formattedDate = format(day, 'yyyy-MM-dd')
                          form.setFieldValue('due_date', formattedDate)
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            </Field>
            <ErrorMessage
              name='due_date'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          {serverError && <p className='text-red-500'>{serverError}</p>}

          <div className='flex flex-col gap-4 sm:flex-row'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='rounded-full border-none bg-blue-500 p-5 text-white sm:p-5 md:text-base'
            >
              Update Task
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

export default EditTaskForm
