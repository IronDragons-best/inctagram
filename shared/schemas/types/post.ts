export type Post = {
  id: string
  title: string
  userId: string
  shortDescription: string
  description: string
  createdAt: string
  files: string[]
  updatedAt?: string
}

export type CreatePostBody = {
  title: string
  shortDescription: string
  files: string[]
}

export type PostTag = { type: 'Post'; id: string | 'LIST' }
