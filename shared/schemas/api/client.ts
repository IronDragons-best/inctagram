import createClient from 'openapi-fetch'
import { paths } from './schema'
import process from 'process'

export const getClient = () => {
  return createClient<paths>({
    baseUrl: process.env.PUBLIC_BASE_URL,
    headers: {},
    credentials: 'include',
  })
}
