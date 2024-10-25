'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../components/ui/button'

export default function Custom404() {
  const router = useRouter()

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white px-4 text-center'>
      {/* 404 Text */}
      <div className='mb-4 flex items-center justify-center'>
        <span className='text-[100px] font-bold text-[#0575e6] md:text-[150px]'>
          4
        </span>
        <Image
          src='/ghost.svg'
          alt='Ghost icon'
          width={150}
          height={150}
          className='mx-2 md:mx-4'
        />
        <span className='text-[100px] font-bold text-[#0575e6] md:text-[150px]'>
          4
        </span>
      </div>

      {/* Boo! Page Missing! */}
      <h1 className='mb-2 text-2xl font-bold md:mb-4 md:text-3xl'>
        Boo! Page missing!
      </h1>

      {/* Subtext */}
      <p className='mb-4 text-base md:mb-6 md:text-lg'>
        Whoops! This page must be a ghost – it's not here!
      </p>

      {/* Back Home Button */}
      <Button
        className='rounded-full bg-[#0575e6] px-4 py-2 text-sm text-white md:px-6 md:py-3 md:text-base'
        onClick={() => router.back()}
      >
        Go Back
      </Button>
    </div>
  )
}
