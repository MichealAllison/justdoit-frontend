import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [
  '/login',
  '/signup',
  '/dashboard',
  '/create-task',
  '/edit-task',
  '/all-tasks',
  '/completed-task',
  '/preview'
]

const authRoutes = ['/login', '/signup']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token =
    request.cookies.get('accessToken')?.value ||
    request.headers.get('Authorization')?.split(' ')[1]

  const isAuthenticated = !!token

  if (
    protectedRoutes.some(route => pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [...protectedRoutes, ...authRoutes]
}
