import { getClient } from '@/shared/schemas/api/client'
import { CreatePost, PostItem, PostQueryArgs, PostTag } from '@/shared/schemas/types/post'
import { baseApi, TAGS } from '@/src/app/provider/baseApi'

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

      queryFn: async arg => {
        try {
          const pageParams = arg.pageParam
          const queryArgs = arg.queryArg
          const res = await client.GET('/posts', {
            params: { query: { ...queryArgs, pageNumber: pageParams } },
          })

          if (res.response.status === 200) {
            const items = res.data?.items ?? []
            return { data: items }
          }
          if (res.response.status === 404) {
            return { data: [] }
          }
          return {
            error: {
              status: res.response.status,
              data: res.data ?? res.error ?? 'Unknown error',
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
      providesTags: (_result, _error, id): PostTag[] => [{ type: TAGS.POST, id } as const],
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
      invalidatesTags: () => [{ type: TAGS.POST, id: 'LIST' }],
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
      invalidatesTags: (_result, _error, { id }): PostTag[] => [{ type: TAGS.POST, id }],
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
