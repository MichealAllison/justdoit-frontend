import { TaskList } from '../type'

export const taskData: TaskList = [
  {
    id: 1,
    title: 'Task One',
    description: 'This is the first task.',
    status: 'Completed',
    priority: 'High',
    dueDate: '2025-04-01T12:00',
    category: 'Work'
  },
  {
    id: 2,
    title: 'Task Two',
    description: 'This is the second task.',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2025-05-01T15:30',
    category: 'Personal'
  }
]

export const getTaskById = (id: number) => {
  return taskData.find(task => task.id === id)
}
