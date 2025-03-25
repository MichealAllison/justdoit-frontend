import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json()

    // Send request to Django backend
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Signup failed' },
        { status: response.status }
      )
    }

    // Return successful response from Django API
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
