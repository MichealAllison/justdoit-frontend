import { Badge } from '@/components/ui/badge'
import React from 'react'

interface PriorityCardProps {
  priority: string
  title: string
  description: string
  date: string
}

const priorityColors = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500'
}

const PriorityCard = ({
  priority,
  title,
  description,
  date
}: PriorityCardProps) => {
  return (
    <div className='w-[320px] rounded-2xl bg-[#3a3939] p-4'>
      <div className='flex items-center justify-between'>
        <Badge
          variant='default'
          className={priorityColors[priority as keyof typeof priorityColors]}
        >
          {priority}
        </Badge>
        <p className='text-sm text-[#e9eaeb]'>{date}</p>
      </div>
      <div className='mt-4 space-y-2'>
        <h3 className='text-xl font-bold text-[#e9eaeb]'>{title}</h3>
        <p className='text-sm text-[#e9eaeb]'>{description}</p>
      </div>
    </div>
  )
}

export default PriorityCard
