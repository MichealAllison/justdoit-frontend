import { Badge } from '@/components/ui/badge'
import React from 'react'
import Link from 'next/link'
import { Task } from '../type'
import { format } from 'date-fns'

interface TaskCardProps extends Task {
  priority: string
  title: string
  description: string
  due_date: string
  status: string
  id: number
}

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500'
}

const statusColors = {
  pending: 'bg-yellow-500/50',
  in_progress: 'bg-blue-500/50',
  completed: 'bg-green-500/50'
}

const TaskCard = ({
  priority,
  title,
  description,
  due_date,
  status,
  id
}: TaskCardProps) => {
  return (
    <div className='h-[200px] w-[320px] rounded-2xl bg-[#3a3939] p-4 md:w-[300px]'>
      <Link href={`/preview/${id}`}>
        <div className='mb-2 flex items-center justify-between'>
          <Badge
            variant='default'
            className={`${priorityColors[priority as keyof typeof priorityColors]} rounded-lg px-2 py-1 text-white`}
          >
            {priority}
          </Badge>
          <p className='text-sm text-white/50'>
            {format(new Date(due_date), 'dd/MM/yyyy')}
          </p>
        </div>
        <div className='mt-2 flex flex-col justify-between'>
          <div className='mt-2 space-y-1'>
            <h3 className='truncate text-lg font-semibold text-[#e9eaeb]'>
              {title}
            </h3>
            <p className='max-h-16 overflow-hidden text-sm text-[#e9eaeb]'>
              {description}
            </p>
          </div>
          <div className='mt-2'>
            <Badge
              variant='default'
              className={`${statusColors[status as keyof typeof statusColors]} rounded-lg px-2 py-1 text-white`}
            >
              {status}
            </Badge>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TaskCard
