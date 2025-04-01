'use client'
import { LucideArrowLeft } from 'lucide-react'
import { Task } from '@/components/Dashboard/type'
import { LucideEdit3 } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getTaskById } from '@/components/Dashboard/data/taskData'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const PreviewTask = () => {
  const router = useRouter()
  const { id } = useParams()
  const { data: task } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskById(Number(id))
  })
  const priority = task?.priority
  const status = task?.status
  const priorityColor =
    priority === 'High'
      ? 'bg-red-500'
      : priority === 'Medium'
        ? 'bg-yellow-500'
        : 'bg-green-500'
  const statusColor = status === 'Completed' ? 'bg-green-500' : 'bg-red-500'

  const created_at = task?.created_at
    ? format(new Date(task.created_at), 'yyyy-MM-dd')
    : ''
  const due_date = task?.due_date
    ? format(new Date(task.due_date), 'yyyy-MM-dd')
    : ''

  return (
    <div className='w-full'>
      <Link href='/dashboard'>
        <LucideArrowLeft size={20} color='white' />
      </Link>
      <div className='mt-20 flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='text-sm text-white/50'>Title</p>
          <h1 className='text-2xl font-bold text-white'>{task?.title}</h1>
        </div>
      </div>
      <div className='mt-5'>
        <p className='text-sm text-white/50'>Description</p>
        <p className='text-white'>{task?.description}</p>
      </div>
      <div className='mt-5'>
        <p className='text-sm text-white/50'>Status</p>
        <Badge variant='default' className={statusColor}>
          {status}
        </Badge>
      </div>
      <div className='mt-5'>
        <p className='text-sm text-white/50'>Priority</p>
        <Badge variant='default' className={priorityColor}>
          {priority}
        </Badge>
      </div>
      <div className='mt-5'>
        <p className='text-sm text-white/50'>Created At</p>
        <p className='text-white'>{created_at}</p>
      </div>

      <Button
        type='submit'
        onClick={() => router.push(`/edit-task/${id}`)}
        className='mt-10 w-full rounded-lg border-none bg-blue-500 p-2 text-white sm:max-w-md md:max-w-lg lg:max-w-xl'
      >
        Edit Task
      </Button>
    </div>
  )
}

export default PreviewTask
