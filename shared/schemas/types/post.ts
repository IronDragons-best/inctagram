import { components, paths } from '@/shared/schemas/api/schema'
import { normalizeError } from '@/shared/utils/handleErrors'

export type RequestResult<T> = { data: T } | { error: ReturnType<typeof normalizeError> }

export type CreatePost = components['schemas']['CreatePostInputDto']
export type PostItem = components['schemas']['PostViewDto']
export type PostQueryArgs = paths['/posts']['get']['parameters']['query']
export type PostsResponse = components['schemas']['PagedPostViewDto']

export type PostTag = { type: 'Post'; id: string | number | 'LIST' }
