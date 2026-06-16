import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '../lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public auth pages under /admin/(auth)/* - these are accessible without a session
  const isPublicAuthPage =
    pathname === '/admin/login' ||
    pathname === '/admin/forgot-password' ||
    pathname === '/admin/reset-password'

  const isAdminPath = pathname.startsWith('/admin')

  const { response, user } = await updateSession(request)

  if (isAdminPath) {
    if (!user && !isPublicAuthPage) {
      // Not logged in - redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (user && pathname === '/admin/login') {
      // Already logged in - skip login page
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
