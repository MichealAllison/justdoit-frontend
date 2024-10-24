'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Reset all errors
    setUsernameError('')
    setPasswordError('')
    setLoginError('')

    // Validate username and password fields
    if (!username) {
      setUsernameError('Username is required.')
    }
    if (!password) {
      setPasswordError('Password is required.')
    }

    // If either field is missing, stop the process
    if (!username || !password) return

    setIsLoading(true)

    // Simulate login process (hardcoded credentials)
    setTimeout(() => {
      setIsLoading(false)

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
        user => user.username === username && user.password === password
      )

      if (user) {
        // Save userType, username, and name to localStorage
        localStorage.setItem('userType', user.type)
        localStorage.setItem('username', user.username)
        localStorage.setItem('name', user.name)

        // Redirect to appropriate dashboard based on userType
        router.push(`/${user.type}dashboard`)
      } else {
        setLoginError('Invalid username or password.')
      }
    }, 1500)
  }

  return (
    <form className='mt-5 space-y-5' onSubmit={handleSubmit}>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='username'>Username</Label>
        <Input
          className='rounded-2xl p-5'
          type='text'
          id='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder='Username'
          aria-label='Username'
        />
        {usernameError && <p className='text-red-500'>{usernameError}</p>}
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
