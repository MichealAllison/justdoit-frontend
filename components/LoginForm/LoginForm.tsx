'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Reset all errors
    setEmailError('')
    setPasswordError('')
    setLoginError('')

    // Validate email and password fields
    if (!email) {
      setEmailError('Email is required.')
    }
    if (!password) {
      setPasswordError('Password is required.')
    }

    // If either field is missing, stop the process
    if (!email || !password) return

    setIsLoading(true)

    // Simulate login process (hardcoded credentials)
    setTimeout(() => {
      setIsLoading(false)

      // Hardcoded user credentials
      if (email === 'admin@example.com' && password === 'admin123') {
        localStorage.setItem('userType', 'admin')
        router.push('/admindashboard')
      } else if (email === 'editor@example.com' && password === 'editor123') {
        localStorage.setItem('userType', 'editor')
        router.push('/editordashboard')
      } else if (email === 'viewer@example.com' && password === 'viewer123') {
        localStorage.setItem('userType', 'viewer')
        router.push('/viewerdashboard')
      } else {
        setLoginError('Invalid email or password.')
      }
    }, 1500)
  }

  return (
    <form className='mt-5 space-y-5' onSubmit={handleSubmit}>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='email'>Email</Label>
        <Input
          className='rounded-2xl p-5'
          type='email'
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
          aria-label='Email'
        />
        {emailError && <p className='text-red-500'>{emailError}</p>}
      </div>

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='password'>Password</Label>
        <Input
          className='rounded-2xl p-5'
          type='password'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          aria-label='Password'
        />
        {passwordError && <p className='text-red-500'>{passwordError}</p>}
      </div>

      {/* Display login error */}
      {loginError && <p className='text-red-500'>{loginError}</p>}

      <Button
        className='w-full rounded-2xl bg-[#0575e6] p-5 text-white'
        type='submit'
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}

export default LoginForm
