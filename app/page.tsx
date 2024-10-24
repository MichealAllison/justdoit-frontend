import LoginForm from '@/components/LoginForm/LoginForm'
import Image from 'next/image'
import React from 'react'

export default function Home() {
  return (
    <section className='flex min-h-screen py-10 md:py-24'>
      <div className='container mx-auto px-4'>
        <div className='flex h-auto w-full flex-col justify-between overflow-hidden rounded-3xl shadow-md md:h-[900px] md:flex-row'>
          <div className='md:flex-2 relative flex flex-1 items-center justify-center bg-gradient-to-t from-[#02298a] to-[#0575e6] p-8 md:px-24 lg:px-32'>
            <div className='absolute bottom-0 left-0 h-[150px] w-[150px] md:h-[300px] md:w-[300px]'>
              <Image
                src='/circle.png'
                alt='project image'
                fill={true}
                className='object-cover'
              />
            </div>
            <div className='text-center md:text-left'>
              <p className='text-2xl font-bold text-white md:text-4xl'>
                DashZone
              </p>
              <p className='text-sm font-normal text-white md:text-base'>
                The most popular peer-to-peer lending at SEA
              </p>
            </div>
          </div>
          <div className='flex flex-1 flex-col items-center justify-center p-6 md:items-start md:p-12 lg:p-24'>
            <div className='mb-6 text-center md:text-left'>
              <p className='text-lg font-bold md:text-2xl'>Hello Again!</p>
              <p className='text-sm font-normal md:text-base'>Welcome Back</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  )
}
