import React from 'react'
import Image from 'next/image'
import LoginForm from './components/LoginForm'

const Login = () => {
  return (
    <div className='full min-h-screen'>
      <div className='w-full'>
        <div className='h-dvh w-full flex-col justify-between overflow-hidden bg-[#1e1e1e] text-white md:flex md:flex-row'>
          {/* Left Section with Background - Hidden on Mobile */}
          <div className='relative hidden flex-1 items-center justify-center bg-gradient-to-t from-[#02298a] to-[#053667] p-8 md:flex md:px-24 lg:px-32'>
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
              <p className='text-2xl font-bold md:text-4xl'>JUST DO IT</p>
              <p className='text-sm font-normal md:text-base'>
                Make life easy with JUST.DO.IT
              </p>
            </div>
          </div>

          {/* Right Section with Login */}
          <div className='flex flex-1 flex-col items-center justify-center p-6 md:items-start md:p-12 lg:p-24'>
            {/* Welcome Text for Mobile (Hidden on larger screens) */}
            <div className='mb-10 text-center md:hidden md:text-left'>
              <p className='text-2xl font-bold text-[#8ebce9] md:text-4xl'>
                JUST DO IT
              </p>
              <p className='text-sm font-normal text-[#8ebce9] md:text-base'>
                Make life easy with JUST.DO.IT
              </p>
            </div>
            {/* Welcome Text */}
            <div className='mb-2 text-center md:text-left'>
              <p className='text-lg font-bold md:text-2xl'>Where were You</p>
              <p className='text-sm font-normal md:text-base'>
                Well as you're back let's fix your life agian
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
