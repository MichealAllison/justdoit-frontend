'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { FormikHelpers } from 'formik'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface FormValues {
  email: string
  password: string
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        try {
          // Verify token validity with API
          const response = await axios.get(
            'https://todo-app-api-dg8b.onrender.com/api/user/verify/',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          )

          if (response.status === 200) {
            router.push('/dashboard')
          }
        } catch (error) {
          // Token invalid or expired, try to refresh
          const refreshToken = localStorage.getItem('refreshToken')
          if (refreshToken) {
            try {
              const refreshResponse = await axios.post(
                'https://todo-app-api-dg8b.onrender.com/api/user/refresh/',
                { refresh: refreshToken }
              )

              if (
                refreshResponse.status === 200 &&
                refreshResponse.data.access
              ) {
                localStorage.setItem('accessToken', refreshResponse.data.access)
                router.push('/dashboard')
              } else {
                // Clear invalid tokens
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
              }
            } catch (refreshError) {
              // Clear invalid tokens
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
            }
          }
        }
      }
    }

    checkAuth()
  }, [router])

  const initialValues: FormValues = {
    email: '',
    password: ''
  }

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {}

    if (!values.email) {
      errors.email = 'Email is required.'
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
    try {
      setLoading(true)
      console.log('Login form values:', values)

      const response = await axios.post(
        'https://todo-app-api-dg8b.onrender.com/api/user/login/',
        {
          email: values.email,
          password: values.password
        }
      )

      console.log('Login Response:', response)

      if (response.status === 200) {
        // Store both tokens if available
        if (response.data.access) {
          localStorage.setItem('accessToken', response.data.access)
        }
        if (response.data.refresh) {
          localStorage.setItem('refreshToken', response.data.refresh)
        }
        // For backward compatibility
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
        }

        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        console.error('Login failed')
      }
    } finally {
      setLoading(false)
      setSubmitting(false)
    }
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

          <div className='flex flex-col items-center gap-3'>
            <Button
              className='h-[50px] w-[300px] rounded-full bg-[#053667] p-5 text-sm text-white md:text-base'
              type='submit'
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
              {loading && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
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
