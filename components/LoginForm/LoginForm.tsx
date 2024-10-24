'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { FormikHelpers } from 'formik'

interface FormValues {
  username: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()

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

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    // Simulate login process
    setTimeout(() => {
      // Hardcoded user credentials with names
      const users = [
        {
          username: 'admin',
          password: 'admin123',
          name: 'Admin User',
          type: 'admin'
        },
        {
          username: 'editor',
          password: 'editor123',
          name: 'Editor User',
          type: 'editor'
        },
        {
          username: 'viewer',
          password: 'viewer123',
          name: 'Viewer User',
          type: 'viewer'
        }
      ]

      // Find user by matching username and password
      const user = users.find(
        user =>
          user.username === values.username && user.password === values.password
      )

      if (user) {
        // Save userType, username, and name to localStorage
        localStorage.setItem('userType', user.type)
        localStorage.setItem('username', user.username)
        localStorage.setItem('name', user.name)

        // Redirect to appropriate dashboard based on userType
        router.push(`/${user.type}-dashboard`)
      } else {
        // Set global form error
        setErrors({ username: 'Invalid username or password.' })
      }

      setSubmitting(false)
    }, 1500)
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

          <div className='-[300px] grid items-center gap-1.5'>
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

          {/* Submit button */}
          <Button
            className='h-[50px] w-[300px] rounded-full bg-[#0575e6] p-5 text-sm text-white md:text-base'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
