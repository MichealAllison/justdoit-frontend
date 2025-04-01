import { Button } from '@/components/ui/button'

const DeleteModal = ({
  setOpen,
  handleDelete
}: {
  setOpen: (open: boolean) => void
  handleDelete: () => void
}) => {
  return (
    <div className='rounded-2xl bg-gray-800 p-6 text-white shadow-xl'>
      <h1 className='mb-2 text-xl font-semibold'>Delete Task</h1>
      <p className='mb-6 text-sm text-gray-300'>
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <div className='flex justify-end gap-3'>
        <Button
          variant='outline'
          className='border-gray-600 text-gray-300 hover:bg-gray-700'
          onClick={() => setOpen(false)}
        >
          No
        </Button>
        <Button
          variant='destructive'
          className='bg-red-600 text-white hover:bg-red-700'
          onClick={handleDelete}
        >
          Yes
        </Button>
      </div>
    </div>
  )
}

export default DeleteModal
