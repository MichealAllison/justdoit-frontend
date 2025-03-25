'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { FormikHelpers } from 'formik'
import { useState } from 'react'
import Link from 'next/link'

interface FormValues {
  username: string
  email: string
  password: string
}

const SignUpForm = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const initialValues: FormValues = {
    username: '',
    email: '',
    password: ''
  }

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {}

    if (!values.username) {
      errors.username = 'Username is required.'
    }

    if (!values.email) {
      errors.email = 'Email is required.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address.'
    }

    if (!values.password) {
      errors.password = 'Password is required.'
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.'
    }

    return errors
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    setServerError(null) // Clear previous errors

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      const data = await response.json()

      console.log('Signup Response:', response.status, data)

      if (!response.ok) {
        setErrors({ username: data.message || 'Signup failed' })
        return
      }

      localStorage.setItem('token', data.access)
      localStorage.setItem('refreshToken', data.refresh)

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup Error:', error)
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
            <Label htmlFor='email'>Email</Label>
            <Field
              name='email'
              type='text'
              as={Input}
              className='h-[50px] rounded-full p-5 text-sm md:text-base'
              placeholder='Email'
              aria-label='Email'
            />
            <ErrorMessage
              name='email'
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
              className='h-[50px] w-[300px] rounded-full bg-[#053667] p-5 text-sm text-white hover:bg-[#0b3864] md:text-base'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Link href='/login'>
              <p className='text-center text-sm'>
                Already have an account?{' '}
                <span className='font-bold text-[#2c96ff]'>Login</span>
              </p>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm
