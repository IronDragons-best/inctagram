import { components } from '@/shared/schemas/api/schema'

export type CreatePost = components['schemas']['CreatePostInputDto']
export type PostItem = components['schemas']['PostViewDto']
export type PostsResponse = components['schemas']['PagedPostViewDto']

export type PostTag = { type: 'Post'; id: string | number | 'LIST' }
