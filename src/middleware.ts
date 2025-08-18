import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access-token')?.value
  const pathname = request.nextUrl.pathname

  const signPages = ['/sign-in', '/sign-up']

  if (token && signPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!token && pathname.startsWith('/profile/')) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/sign-in', '/sign-up'],
}
