import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  const isAuth = Boolean(accessToken)

  const guestAllowed = [
    '/sign-in',
    '/sign-up',
    '/confirm-registration',
    '/forgot-password',
    '/new-password',
    '/password-recovery',
    '/expired-link',
  ]
  const isPublicProfile =
    /^\/profile\/\d+$/.test(pathname) ||
    (/^\/profile\/\d+$/.test(pathname) && searchParams.has('postId'))

  if (isAuth && guestAllowed.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isAuth) {
    if (guestAllowed.includes(pathname) || isPublicProfile) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/profile/:path*',
    '/confirm-registration',
    '/forgot-password',
    '/new-password',
    '/password-recovery',
    '/expired-link',
  ],
}
