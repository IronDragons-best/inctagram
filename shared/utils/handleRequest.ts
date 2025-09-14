import { RequestResult } from '../schemas/types/post'
import { normalizeError } from './handleErrors'

export async function handleRequest<T>(
  fn: () => Promise<{ data: T; response: { status: number } }>
): Promise<RequestResult<T>> {
  try {
    const res = await fn()
    if (res.response.status >= 200 && res.response.status < 300) {
      return { data: res.data }
    }
    return { error: normalizeError({ status: res.response.status, data: res.data }) }
  } catch (e) {
    return { error: normalizeError(e) }
  }
}
