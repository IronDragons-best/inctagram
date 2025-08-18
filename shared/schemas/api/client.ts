import createClient from 'openapi-fetch'
import { paths } from './schema'

export const getClient = () => {
  return createClient<paths>({
    baseUrl: 'https://nodewebdev.online/api/v1',
    headers: {},
    credentials: 'include',
  })
}
