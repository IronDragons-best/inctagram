import { getClient } from '@/shared/schemas/api/client'
import type { PostItem, PostQueryArgs, PostsResponse } from '@/shared/schemas/types/post'

/**
 * Универсальные функции получения постов.
 * Их можно вызывать и на сервере (SSR), и внутри RTK Query.
 * Никаких хуков/Redux — просто обращения к OpenAPI-клиенту.
 */

export async function fetchPosts(query: PostQueryArgs): Promise<PostItem[]> {
  const client = getClient()
  const res = await client.GET('/posts', { params: { query } })

  if (res.response.status === 200) {
    const data = res.data as PostsResponse | undefined
    return data?.items ?? []
  }

  if (res.response.status === 404) {
    // считаем "нет результатов" — это пустой список, а не ошибка
    return []
  }

  // на всё остальное можно вернуть пусто, чтобы не ронять SSR-рендер
  // или логируй и верни []:
  // console.error('fetchPosts failed', res.response.status, res.data)
  return []
}

export async function fetchPostById(id: number): Promise<PostItem | null> {
  const client = getClient()
  const res = await client.GET('/posts/{id}', { params: { path: { id } } })

  if (res.response.status === 200) return (res.data ?? null) as PostItem | null
  if (res.response.status === 404) return null

  throw new Error(`Failed to load post ${id}: ${res.response.status}`)
}

/**
 * Вспомогалка: достать массив картинок для модалки.
 */
export function extractPostSrcArray(post: PostItem | null | undefined): string[] {
  if (!post) return []
  const preview = post?.previewImages as string[] | undefined
  return preview?.length ? preview : []
}
