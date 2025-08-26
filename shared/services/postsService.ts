import { getClient } from '@/shared/schemas/api/client'
import type { PostItem, PostQueryArgs } from '@/shared/schemas/types/post'
import { components } from '@/shared/schemas/api/schema'

type PagedPostViewDto = components['schemas']['PagedPostViewDto']
type PostViewDto = components['schemas']['PostViewDto']

/**
 * Универсальные функции получения постов.
 * Их можно вызывать и на сервере (SSR), и внутри RTK Query.
 * Никаких хуков/Redux — просто обращения к OpenAPI-клиенту.
 */

export async function fetchPosts(query: PostQueryArgs): Promise<PostItem[]> {
  const client = getClient()
  const res = await client.GET('/posts', { params: { query } })

  if (res.response.status === 200) {
    const data = res.data as PagedPostViewDto | undefined
    const items: PostItem[] = (data?.items ?? []).map((p: PostViewDto) => ({
      id: p.id,
      user: { userId: p.user.userId, username: p.user.username },
      description: p.description ?? '',
      previewImages: p.previewImages ?? [],
      createdAt: p.createdAt,
    }))
    return items
  }

  if (res.response.status === 404) {
    return []
  }

  return []
}

export async function fetchPostById(id: number): Promise<PostItem | null> {
  const client = getClient()
  const res = await client.GET('/posts/{id}', { params: { path: { id } } })

  if (res.response.status === 200) {
    const p = res.data as PostViewDto | undefined
    if (!p) return null

    const item: PostItem = {
      id: p.id,
      user: { userId: p.user.userId, username: p.user.username },
      description: p.description ?? '',
      previewImages: p.previewImages ?? [],
      createdAt: p.createdAt,
    }
    return item
  }
  if (res.response.status === 404) return null

  throw new Error(`Failed to load post ${id}: ${res.response.status}`)
}

/**
 * Вспомогалка: достать массив картинок для модалки.
 */
export function extractPostSrcArray(
  post: { previewImages?: string[] } | null | undefined
): string[] {
  const preview = post?.previewImages
  return Array.isArray(preview) && preview.length ? preview : []
}

export async function fetchLatestPostForHome(): Promise<PostItem[]> {
  const client = getClient()
  const res = await client.GET('/posts', {
    params: {
      query: {
        pageNumber: 1,
        pageSize: 4,
        sortBy: 'createdAt',
        sortDirection: 'DESC',
      },
    },
  })

  if (res.response.status === 200) {
    const data = res.data as PagedPostViewDto
    const items = (data?.items ?? []).map((p: PostViewDto) => ({
      ...p,
      id: p.id,
      user: {
        userId: p.user.userId,
        username: p.user.username,
      },
      description: p?.description ?? '',
      previewImages: p.previewImages ?? [],
      createdAt: p.createdAt,
    })) as PostItem[]
    return items
  }

  if (res.response.status === 404) return []
  return []
}
