'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { FormikHelpers } from 'formik'
import Link from 'next/link'
import { useState } from 'react'

interface FormValues {
  username: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const initialValues: FormValues = {
    username: '',
    password: ''
  }

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {}

    if (!values.username) {
      errors.username = 'Username is required.'
    }

    if (!values.password) {
      errors.password = 'Password is required.'
    }

    return errors
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    setServerError(null)

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors({ username: data.message || 'Invalid username or password' })
        return
      }

      // Store JWT token
      localStorage.setItem('token', data.access)
      localStorage.setItem('refreshToken', data.refresh)

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      setServerError('Something went wrong. Please try again.')
    }

    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='mt-5 space-y-5'>
          <div className='grid w-[300px] items-center gap-1.5'>
            <Label htmlFor='username'>Username</Label>
            <Field
              name='username'
              type='text'
              as={Input}
              className='h-[50px] rounded-full p-5 text-sm md:text-base'
              placeholder='Username'
              aria-label='Username'
            />
            <ErrorMessage
              name='username'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          <div className='grid w-[300px] items-center gap-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Field
              name='password'
              type='password'
              as={Input}
              className='h-[50px] rounded-full p-5 text-sm md:text-base'
              placeholder='Password'
              aria-label='Password'
            />
            <ErrorMessage
              name='password'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          {serverError && <p className='text-sm text-red-500'>{serverError}</p>}

          <div className='flex flex-col items-center gap-3'>
            <Button
              className='h-[50px] w-[300px] rounded-full bg-[#053667] p-5 text-sm text-white md:text-base'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
            <Link href='/sign-up'>
              <p className='text-center text-sm'>
                Don't have an account?{' '}
                <span className='font-bold text-[#053667] hover:bg-[#0f467c]'>
                  Sign Up
                </span>
              </p>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
