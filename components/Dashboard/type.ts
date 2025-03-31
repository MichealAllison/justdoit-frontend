export type Task = {
  id: number
  title: string
  description: string
  priority: string
  category: string
  dueDate: string
  status: string
}

export type TaskList = Task[]
