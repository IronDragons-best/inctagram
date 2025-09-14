import createClient from 'openapi-fetch'
import { paths } from './schema'
import process from 'process'

const stageBaseUrl = 'https://nodewebdev.online/api/v1'
const productionBaseUrl = 'https://irondragon.site/api/v1'
const baseUrl = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? stageBaseUrl : productionBaseUrl

export const getClient = () => {
  return createClient<paths>({
    baseUrl: baseUrl,
    headers: {},
    credentials: 'include',
  })
}
