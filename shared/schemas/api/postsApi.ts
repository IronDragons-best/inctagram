import { getClient } from '@/shared/schemas/api/client'
import { CreatePost, PostItem, PostQueryArgs, PostTag } from '@/shared/schemas/types/post'
import { baseApi, TAGS } from '@/src/app/provider/baseApi'
import { handleRequest } from '@/shared/utils/handleRequest'

const client = getClient()

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPosts: build.infiniteQuery<PostItem[], PostQueryArgs, number>({
      infiniteQueryOptions: {
        initialPageParam: 2,
        maxPages: 20,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          if (lastPage.length === 0) return undefined
          return lastPageParam + 1
        },
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
          return firstPageParam > 0 ? firstPageParam - 1 : undefined
        },
      },

      queryFn: async arg =>
        handleRequest<PostItem[]>(async () => {
          const res = await client.GET('/posts', {
            params: { query: { ...arg.queryArg, pageNumber: arg.pageParam } },
          })
          return { data: res.data?.items ?? [], response: { status: res.response.status } }
        }),
      providesTags: result => {
        return result
          ? [
              { type: TAGS.POST, id: 'LIST' },
              ...result.pages.flatMap(page =>
                Array.isArray(page) ? page.map(post => ({ type: TAGS.POST, id: post.id })) : []
              ),
            ]
          : [{ type: TAGS.POST, id: 'LIST' }]
      },
    }),

    getPostById: build.query<PostItem, number>({
      queryFn: id =>
        handleRequest<PostItem>(async () => {
          const res = await client.GET('/posts/{id}', { params: { path: { id } } })
          if (!res.data) throw new Error('Post not found')
          return { data: res.data, response: { status: res.response.status } }
        }),
      providesTags: (_result, _error, id): PostTag[] => [{ type: TAGS.POST, id } as const],
    }),

    createPost: build.mutation<PostItem, CreatePost>({
      queryFn: postPayload =>
        handleRequest<PostItem>(async () => {
          const res = await client.POST('/posts/create-post', { body: postPayload })
          return { data: res.data!, response: { status: res.response.status } }
        }),
      invalidatesTags: () => [{ type: TAGS.POST, id: 'LIST' }],
    }),

    updatePost: build.mutation<PostItem, { id: number; body: Partial<CreatePost> }>({
      queryFn: ({ id, body }) =>
        handleRequest<PostItem>(async () => {
          const res = await client.PUT('/posts/{id}', {
            params: { path: { id } },
            body: { description: body.description ?? '' },
          })
          if (!res.data) throw new Error('Post not found')
          return { data: res.data, response: { status: res.response.status } }
        }),
      invalidatesTags: (_result, _error, { id }): PostTag[] => [{ type: TAGS.POST, id }],
    }),

    deletePost: build.mutation<{ success: boolean }, number>({
      queryFn: id =>
        handleRequest<{ success: boolean }>(async () => {
          const res = await client.DELETE('/posts/{id}', { params: { path: { id } } })
          return {
            data: { success: res.response.status === 200 },
            response: { status: res.response.status },
          }
        }),
      invalidatesTags: (_result, _error, id): PostTag[] => [{ type: TAGS.POST, id }],
    }),
  }),
})

export const {
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostsInfiniteQuery,
} = postsApi
