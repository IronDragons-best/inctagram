import { parse, serialize } from 'cookie'
import createClient from 'openapi-fetch'
import { paths } from './schema'

const isSecure = process.env.HTTPS === 'true'

export const TokenService = {
  setToken(token: string) {
    const cookie = serialize('access-token', token, {
      path: '/',
      httpOnly: false,
      secure: isSecure,
      maxAge: 900,
      sameSite: 'lax',
    })
    document.cookie = cookie
  },
  getToken() {
    if (typeof window === 'undefined') {
      return null
    }
    const cookies = parse(document.cookie)
    return cookies['access-token'] || null
  },
  clear() {
    const cookie = serialize('access-token', '', {
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
      secure: isSecure,
    })
    document.cookie = cookie
  },
}

export const getClient = () => {
  const accessToken = TokenService.getToken()
  return createClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    credentials: 'include',
  })
}
