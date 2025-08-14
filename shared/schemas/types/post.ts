import { components } from '@/shared/schemas/api/schema'

export type Post = {
  id: string
  title: string
  user: User
  shortDescription: string
  description: string
  createdAt: string
}

// export type PostsResponse = {
//   items: PostItem[]
//   totalCount: number
//   pagesCount: number
//   page: number
//   pageSize: number
// }

export type CreatePost = components['schemas']['CreatePostInputDto']
export type PostItem = components['schemas']['PostViewDto']
export type User = components['schemas']['PostUserDto']
export type PostsResponse = components['schemas']['PagedPostViewDto']

export type PostTag = { type: 'Post'; id: string | number | 'LIST' }
