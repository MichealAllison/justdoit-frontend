'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../components/ui/button'

export default function Custom404() {
  const router = useRouter()

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white text-center'>
      {/* 404 Text */}
      <div className='mb-4 flex items-center justify-center'>
        <span className='text-[150px] font-bold text-[#0575e6]'>4</span>
        <Image
          src='/ghost.svg'
          alt='Ghost icon'
          width={200}
          height={200}
          className='mx-2'
        />
        <span className='text-[150px] font-bold text-[#0575e6]'>4</span>
      </div>

      {/* Boo! Page Missing! */}
      <h1 className='mb-4 text-3xl font-bold'>Boo! Page missing!</h1>

      {/* Subtext */}
      <p className='mb-6 text-lg'>
        Whoops! This page must be a ghost – it's not here!
      </p>

      {/* Back Home Button */}
      <Button
        className='rounded-full bg-[#02298a] px-6 py-2 text-white'
        onClick={() => router.push('/')}
      >
        Go Back Home
      </Button>
    </div>
  )
}
