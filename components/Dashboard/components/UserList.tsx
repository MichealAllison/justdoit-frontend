'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://todo-app-api-dg8b.onrender.com/api/user/users/'
        )
        console.log('API Response:', response.data)
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Loading users...</p>

  return (
    <div>
      <h2 className='text-lg font-bold text-white'>User List</h2>
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user: any) => (
            <li key={user.id} className='text-white'>
              {user.username || user.name || JSON.stringify(user)}
              <br />
              {user.email || user.email || JSON.stringify(user)}
              <br />
              {user.created_at || user.created_at || JSON.stringify(user)}
              <br />
              {user.updated_at || user.updated_at || JSON.stringify(user)}
            </li>
          ))
        ) : (
          <li className='text-white'>No users found</li>
        )}
      </ul>
    </div>
  )
}

export default UserList
