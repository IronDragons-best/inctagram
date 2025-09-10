import { PATH } from '@/shared/constants/path'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
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

  const profileMatch = pathname.match(/^\/profile\/(\d+)(\/.*)?$/)
  const isProfileRoute = Boolean(profileMatch)
  const profileUserId = profileMatch ? profileMatch[1] : null

  if (isAuth && guestAllowed.includes(pathname)) {
    if (accessToken) {
      const tokenUserId = getUserIdFromToken(accessToken)
      if (tokenUserId) {
        return NextResponse.redirect(new URL(PATH.user_profile(tokenUserId), request.url))
      }
    }
  }

  if (!isAuth) {
    const isPublicProfileView = /^\/profile\/\d+$/.test(pathname)
    if (guestAllowed.includes(pathname) || isPublicProfileView) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL(PATH.sign_in, request.url))
  }

  if (isAuth && isProfileRoute && accessToken) {
    const tokenUserId = getUserIdFromToken(accessToken)
    if (!tokenUserId) return NextResponse.next()

    const isSettingsPage = pathname.endsWith('/settings')

    if (isSettingsPage && tokenUserId !== profileUserId && profileUserId) {
      return NextResponse.redirect(new URL(PATH.user_profile(profileUserId), request.url))
    }
  }
  return NextResponse.next()
}

export const getUserIdFromToken = (token: string): string | null => {
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]!))
    return String(payload.id)
  } catch {
    return null
  }
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
