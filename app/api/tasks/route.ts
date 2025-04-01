import { NextResponse } from 'next/server'
import { fetchTasks } from '@/components/Dashboard/data/taskData'

// Initialize taskData array to store tasks
let taskData: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.priority || !body.dueDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate new ID
    const newId = Math.max(...taskData.map(task => task.id), 0) + 1

    // Create new task
    const newTask = {
      id: newId,
      title: body.title,
      description: body.description,
      priority: body.priority,
      dueDate: body.dueDate,
      status: 'Not Started'
    }

    // Add to taskData array
    taskData.push(newTask)

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(taskData)
}
