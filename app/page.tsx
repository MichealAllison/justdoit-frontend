import LoginForm from '@/components/LoginForm/LoginForm'
import Image from 'next/image'
import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />
      </Head>
      <section className='flex min-h-screen'>
        <div className='w-full'>
          <div className='h-dvh w-full flex-col justify-between overflow-hidden md:flex md:flex-row'>
            {/* Left Section with Background */}
            <div className='relative hidden flex-1 items-center justify-center bg-gradient-to-t from-[#02298a] to-[#0575e6] p-8 md:flex md:px-24 lg:px-32'>
              {/* Background Circle Image */}
              <div className='absolute bottom-0 left-0 h-[600px] w-[600px] md:h-[400px] md:w-[400px]'>
                <Image
                  src='/circle.png'
                  alt='project image'
                  fill={true}
                  className='object-cover'
                />
              </div>
              {/* Title and Description */}
              <div className='z-10 text-center md:text-left'>
                <p className='text-2xl font-bold text-white md:text-4xl'>
                  DashZone
                </p>
                <p className='text-sm font-normal text-white md:text-base'>
                  The most popular peer-to-peer lending at SEA
                </p>
              </div>
            </div>

            {/* Right Section with Login */}
            <div className='flex flex-1 flex-col items-center justify-center p-6 md:items-start md:p-12 lg:p-24'>
              {/* Welcome Text */}
              <div className='mb-5 text-center sm:hidden md:text-left'>
                <p className='text-2xl font-bold text-[#02298a] md:text-4xl'>
                  DashZone
                </p>
                <p className='text-sm font-normal text-[#02298a] md:text-base'>
                  The most popular peer-to-peer lending at SEA
                </p>
              </div>
              <div className='mb-2 text-center md:text-left'>
                <p className='text-lg font-bold md:text-2xl'>Hello Again!</p>
                <p className='text-sm font-normal md:text-base'>Welcome Back</p>
              </div>
              {/* Login Form */}
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
