import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-for-dev-only')

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  const { pathname } = request.nextUrl

  // Define public paths that don't need auth
  const isPublicPath = pathname === '/login' || pathname.startsWith('/api/auth')

  // If no token and trying to access protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If we have a token
  if (token) {
    try {
      await jose.jwtVerify(token, JWT_SECRET)
      
      // If valid token and trying to access login page, redirect to dashboard
      if (pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      
      // Also redirect root to dashboard
      if (pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      
      return NextResponse.next()
    } catch (error) {
      // Invalid token, clear it and redirect to login if not already on public path
      if (!isPublicPath) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('admin_token')
        return response
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
