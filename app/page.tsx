import LoginForm from '@/components/LoginForm/LoginForm'
import Image from 'next/image'
import React from 'react'

export default function Home() {
  return (
    <section className='flex min-h-screen py-24'>
      <div className='container'>
        <div className='flex h-[900px] w-auto justify-between shadow-md'>
          <div className='flex-2 relative content-center rounded-3xl bg-gradient-to-t from-[#02298a] to-[#0575e6] px-60'>
            <div className='absolute bottom-0 left-0 h-[300px] w-[300px]'>
              <Image
                src='/circle.png'
                alt='project image'
                fill={true}
                className='object-cover'
              />
            </div>
            <div className=''>
              <p className='text-4xl font-bold text-white'>DashZone</p>
              <p className='text-base font-normal text-white'>
                The most popular peer to peer leading at SEA
              </p>
            </div>
          </div>
          <div className='p flex-1 content-center px-24'>
            <div>
              <p className='text-2xl font-bold'>Hello Again!</p>
              <p className='text-base font-normal'>Welcome Back</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  )
}
