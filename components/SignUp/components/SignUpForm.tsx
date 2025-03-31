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
  username: string
  email: string
  password: string
  confirmPassword: string
}

const SignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const initialValues: FormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required.'
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match.'
    }

    return errors
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(
          'https://todo-app-api-dg8b.onrender.com/api/user/create/'
        )
        console.log('API Response:', response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // const handleSubmit = async (
  //   values: FormValues,
  //   { setSubmitting }: FormikHelpers<FormValues>
  // ) => {
  //   // Form submission handling removed - start fresh
  //   console.log('Form values:', values)

  //   // Placeholder for future implementation
  //   setSubmitting(false)
  // }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      setLoading(true)
      console.log('Sending request with data:', {
        name: values.username,
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword
      })

      const response = await axios.post(
        'https://todo-app-api-dg8b.onrender.com/api/user/create/',
        {
          name: values.username,
          email: values.email,
          password: values.password,
          confirm_password: values.confirmPassword
        }
      )

      console.log('API Response:', response)

      if (response.status === 201) {
        console.log('User created successfully')
        router.push('/login')
      } else {
        console.error('Failed to create user')
      }
    } catch (error: any) {
      console.error('Error creating user:', error)

      // Handle API validation errors
      if (error.response && error.response.data) {
        console.log('API error response:', error.response.data)
        const apiErrors: any = {}

        // Map backend errors to form fields
        if (error.response.data.email)
          apiErrors.email = error.response.data.email[0]
        if (error.response.data.name)
          apiErrors.username = error.response.data.name[0]
        if (error.response.data.password)
          apiErrors.password = error.response.data.password[0]
        if (error.response.data.confirm_password)
          apiErrors.confirmPassword = error.response.data.confirm_password[0]

        setErrors(apiErrors)
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

          <div className='grid w-[300px] items-center gap-1.5'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Field
              name='confirmPassword'
              type='password'
              as={Input}
              className='h-[50px] rounded-full p-5 text-sm md:text-base'
              placeholder='Confirm Password'
              aria-label='Password'
            />
            <ErrorMessage
              name='confirmPassword'
              component='p'
              className='text-sm text-red-500'
            />
          </div>

          <div className='flex flex-col items-center gap-3'>
            <Button
              className='h-[50px] w-[300px] rounded-full bg-[#053667] p-5 text-sm text-white hover:bg-[#0b3864] md:text-base'
              type='submit'
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
              {loading && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
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
