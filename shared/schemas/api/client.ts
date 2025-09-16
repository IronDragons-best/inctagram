import createClient from 'openapi-fetch'
import { paths } from './schema'
import { baseUrl } from '@/shared/constants/baseApiUrl'

export const getClient = () => {
  return createClient<paths>({
    baseUrl: baseUrl,
    headers: {},
    credentials: 'include',
  })
}
