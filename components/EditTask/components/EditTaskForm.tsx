'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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

interface TaskFormValues {
  title: string
  description: string
  priority: string
  dueDate: string
  category: string
}

const mockTasks = [
  {
    id: '1',
    title: 'Task One',
    description: 'This is the first task.',
    priority: 'High',
    dueDate: '2025-04-01T12:00',
    category: 'Work'
  },
  {
    id: '2',
    title: 'Task Two',
    description: 'This is the second task.',
    priority: 'Medium',
    dueDate: '2025-05-01T15:30',
    category: 'Personal'
  }
]

const EditTaskForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [serverError, setServerError] = useState<string | null>(null)
  const [initialValues, setInitialValues] = useState<TaskFormValues>({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    category: ''
  })

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      const task = mockTasks.find(task => task.id === id)
      if (task) {
        setInitialValues(task)
      }
    }
  }, [searchParams])

  const validate = (values: TaskFormValues) => {
    const errors: Partial<TaskFormValues> = {}
    if (!values.title) errors.title = 'Title is required'
    if (!values.description) errors.description = 'Description is required'
    if (!values.priority) errors.priority = 'Priority is required'
    if (!values.dueDate) errors.dueDate = 'Due date is required'
    return errors
  }

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      console.log('Updated Values:', values)
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
              className='w-full bg-white/10 p-2 text-white'
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
                  <SelectTrigger className='w-full bg-white/10 p-2 text-white'>
                    <SelectValue placeholder='Select priority' />
                  </SelectTrigger>
                  <SelectContent>
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
              className='w-full bg-white/10 p-2 text-white'
            />
            <ErrorMessage
              name='dueDate'
              component='p'
              className='text-red-500'
            />
          </div>

          <div className='space-y-2'>
            <Label className='text-white'>Category</Label>
            <Field
              name='category'
              as={Input}
              className='w-full bg-white/10 p-2 text-white'
            />
          </div>

          {serverError && <p className='text-red-500'>{serverError}</p>}

          <div className='flex gap-4'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='bg-blue-500'
            >
              Update Task
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.back()}
              className='bg-white text-black'
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
