import Image from 'next/image'
import React from 'react'

export default function Home() {
  return (
    <section className='flex min-h-screen py-24'>
      <div className='container'>
        <div className='flex h-[900px] w-[860px] justify-between'>
          <div className='relative flex-1 content-center rounded-3xl bg-gradient-to-t from-[#02298a] to-[#0575e6] px-64'>
            <div className='absolute bottom-0 left-0 h-[300px] w-[300px]'>
              <Image
                src='/circle.png'
                alt='project image'
                fill={true}
                className='object-cover'
              />
            </div>
            <div className=''>
              <p className='text-digiWhite text-4xl font-bold'>DashZone</p>
              <p className='text-digiWhite text-base font-normal'>
                The most popular peer to peer leading at SEA
              </p>
            </div>
          </div>
          <div className='flex-1 content-center px-64'>
            <p className='text-xl'>Hello Again!</p>
          </div>
        </div>
      </div>
    </section>
  )
}
