export type Task = {
  id: number
  title: string
  description: string
  priority: string
  due_date: string
  status: string
}

export type TaskList = Task[]
