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
import { taskData } from '@/components/Dashboard/data/taskData'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar, LucideCalendar } from 'lucide-react'
interface TaskFormValues {
  title: string
  description: string
  priority: string
  dueDate: string
  category: string
}

const EditTaskForm = () => {
  const router = useRouter()
  const { id } = useParams() // Get the ID from URL params
  const [serverError, setServerError] = useState<string | null>(null)
  const [initialValues, setInitialValues] = useState<TaskFormValues>({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    category: ''
  })

  useEffect(() => {
    if (id) {
      const task = taskData.find(task => task.id === parseInt(id as string))
      if (task) {
        setInitialValues({
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: task.dueDate,
          category: task.category
        })
      }
    }
  }, [id])

  const validate = (values: TaskFormValues) => {
    const errors: Partial<TaskFormValues> = {}
    if (!values.title) errors.title = 'Title is required'
    if (!values.description) errors.description = 'Description is required'
    if (!values.priority) errors.priority = 'Priority is required'
    if (!values.dueDate) errors.dueDate = 'Due date is required'
    return errors
  }

  const [dueDate, setDueDate] = useState<Date | null>(null)

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      const taskIndex = taskData.findIndex(
        task => task.id === parseInt(id as string)
      )
      if (taskIndex !== -1) {
        taskData[taskIndex] = {
          ...taskData[taskIndex],
          title: values.title,
          description: values.description,
          priority: values.priority,
          dueDate: values.dueDate,
          category: values.category
        }
      }
      router.push('/dashboard')
    } catch (error) {
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
        <Form className='space-y-4 rounded-lg p-4 sm:p-6 lg:w-[1000px] lg:p-8'>
          <div className='space-y-2'>
            <Label className='text-white'>Title</Label>
            <Field
              name='title'
              type='text'
              as={Input}
              placeholder='Task title'
              className='w-full bg-white/10 p-2 text-white'
            />
            <ErrorMessage name='title' component='p' className='text-red-500' />
          </div>

          <div className='space-y-2'>
            <Label className='text-white'>Description</Label>
            <Field
              name='description'
              as='textarea'
              className='w-full rounded-lg border-none bg-white/10 p-2 text-white sm:p-4'
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
                  <SelectTrigger className='w-full rounded-lg border-none bg-white/10 p-2 text-white sm:p-4'>
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
            <Label className='text-white'>Due Date</Label>
            <Field
              name='dueDate'
              type='datetime-local'
              as={Input}
              className='w-full rounded-lg border-none bg-white/10 p-2 text-white sm:p-4'
            />
            <ErrorMessage
              name='dueDate'
              component='p'
              className='text-red-500'
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-full justify-start rounded-lg border-none bg-white/10 p-2 text-left text-white sm:p-4',
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
                onSelect={(day: Date | undefined) => setDueDate(day || null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className='space-y-2'>
            <Label className='text-white'>Category</Label>
            <Field
              name='category'
              as={Input}
              className='w-full rounded-lg border-none bg-white/10 p-2 text-white sm:p-4'
            />
          </div>

          {serverError && <p className='text-red-500'>{serverError}</p>}

          <div className='flex gap-4'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='rounded-lg border-none bg-blue-500 p-2 text-white sm:p-4'
            >
              Update Task
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.back()}
              className='rounded-lg border-none bg-white/10 p-2 text-white sm:p-4'
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
