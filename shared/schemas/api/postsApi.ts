import { getClient } from '@/shared/schemas/api/client'
import { CreatePost, PostItem, PostQueryArgs, PostTag } from '@/shared/schemas/types/post'
import { TAGS, baseApi } from '@/src/app/provider/baseApi'

const client = getClient()

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPosts: build.query<PostItem[], PostQueryArgs>({
      queryFn: async arg => {
        try {
          const res = await client.GET('/posts', { params: { query: arg } })
          if (res.response.status === 200 && res.data?.items) {
            return { data: res.data.items }
          }
          if (res.error) {
            return {
              error: {
                status: res.response.status,
                data: res.error,
              },
            }
          }

          if (res.response.status === 200) {
            return { data: [] }
          }

          return {
            error: {
              status: res.response.status,
              data: res.data ?? 'Unknown error',
            },
          }
        } catch (e) {
          return {
            error: {
              status: 500,
              data: e instanceof Error ? e.message : String(e),
            },
          }
        }
      },
      providesTags: (result: PostItem[] | undefined) =>
        result
          ? [
              ...result.map(({ id }): PostTag => ({ type: TAGS.POST, id })),
              { type: TAGS.POST, id: 'LIST' },
            ]
          : [{ type: TAGS.POST, id: 'LIST' }],
    }),

    getPostById: build.query({
      queryFn: async (id: number) => {
        try {
          const res = await client.GET('/posts/{id}', {
            params: {
              path: { id },
            },
          })

          if (res.response.status === 200) {
            return { data: res.data }
          }
          return {
            error: {
              status: res.response.status,
              data: res.data ?? 'Unknown error',
            },
          }
        } catch (e) {
          return {
            error: {
              status: 500,
              data: e instanceof Error ? e.message : String(e),
            },
          }
        }
      },
      providesTags: (_result, _error, id): PostTag[] => [{ type: TAGS.POST, id }],
    }),

    createPost: build.mutation({
      queryFn: async (postPayload: CreatePost) => {
        try {
          const res = await client.POST('/posts/create-post', {
            body: postPayload,
          })

          if (res.response.status === 201 || res.response.status === 200) {
            return { data: res.data }
          }

          return {
            error: {
              status: res.response.status,
              data: res.data ?? 'Unknown error',
            },
          }
        } catch (e) {
          return {
            error: {
              status: 500,
              data: e instanceof Error ? e.message : String(e),
            },
          }
        }
      },
      invalidatesTags: [{ type: TAGS.POST, id: 'LIST' }],
    }),

    updatePost: build.mutation({
      queryFn: async ({ id, body }) => {
        try {
          const res = await client.PUT('/posts/{id}', {
            params: { path: { id: Number(id) } },
            body: { description: body.description ?? '' },
          })

          if (res.response.status === 200) {
            return { data: res.data }
          }

          return {
            error: {
              status: res.response.status,
              data: res.data ?? 'Unknown error',
            },
          }
        } catch (e) {
          return {
            error: {
              status: 500,
              data: e instanceof Error ? e.message : String(e),
            },
          }
        }
      },
      invalidatesTags: (result, error, { id }): PostTag[] => [{ type: TAGS.POST, id }],
    }),

    deletePost: build.mutation({
      queryFn: async id => {
        try {
          const res = await client.DELETE('/posts/{id}', {
            params: { path: { id: Number(id) } },
          })

          if (res.response.status === 200) {
            return { data: { success: true } }
          }

          return {
            error: {
              status: res.response.status,
              data: res.data ?? 'Unknown error',
            },
          }
        } catch (e) {
          return {
            error: {
              status: 500,
              data: e instanceof Error ? e.message : String(e),
            },
          }
        }
      },
      invalidatesTags: (result, error, id): PostTag[] => [{ type: TAGS.POST, id }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi
