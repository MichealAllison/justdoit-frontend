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

interface TaskFormValues {
  title: string
  description: string
  priority: string
  dueDate: string
}

const CreateTaskForm = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const initialValues: TaskFormValues = {
    title: '',
    description: '',
    priority: '',
    dueDate: ''
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

    return errors
  }

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      router.push('/dashboard')
    } catch (error) {
      setServerError('Failed to create task. Please try again.')
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='space-y-4 rounded-lg p-4 sm:p-6 lg:w-[1000px] lg:p-8'>
          <div className='space-y-2'>
            <Label className='text-white' htmlFor='title'>
              Title
            </Label>
            <Field
              name='title'
              type='text'
              as={Input}
              className='w-full rounded-lg border-none bg-white/10 p-2 text-white sm:p-4'
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
              className='w-full rounded-lg border-none bg-white/10 p-2 text-white sm:p-4'
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
            <ErrorMessage
              name='priority'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          <div className='space-y-2'>
            <Label className='text-white' htmlFor='dueDate'>
              Due Date
            </Label>
            <Field
              name='dueDate'
              type='datetime-local'
              as={Input}
              className='w-full rounded-lg border-none bg-white/10 p-2 text-white sm:p-4'
            />
            <ErrorMessage
              name='dueDate'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          <div className='space-y-2'>
            <Label className='text-white' htmlFor='category'>
              Category
            </Label>
            <Field
              name='category'
              as={Input}
              className='w-full rounded-lg border-none bg-white/10 p-2 text-white sm:p-4'
            />
          </div>

          {serverError && <p className='text-sm text-red-500'>{serverError}</p>}

          <div className='flex flex-col gap-4 sm:flex-row'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-blue-500 text-white hover:bg-blue-600'
            >
              Create Task
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.back()}
              className='w-full bg-white text-black hover:bg-gray-200'
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
