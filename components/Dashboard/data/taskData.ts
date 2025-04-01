import { TaskList } from '../type'
import axios from 'axios'

// Function to fetch tasks from the API
export const fetchTasks = async (): Promise<TaskList> => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await axios.get(
      'https://todo-app-api-dg8b.onrender.com/api/task/api/v1/tasks/',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
}

export const getTaskById = async (id: number) => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await axios.get(
      `https://todo-app-api-dg8b.onrender.com/api/task/api/v1/tasks/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching task:', error)
    return null
  }
}
