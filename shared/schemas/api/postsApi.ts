import { Post, PostTag } from '@/shared/schemas/types/post'
import { baseApi, TAGS } from '@/src/app/provider/baseApi'
import { getClient, TokenService } from '@/shared/schemas/api/client'

const client = getClient(TokenService.getToken())

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPosts: build.query({
      queryFn: async () => {
        try {
          const res = await client.GET('/posts')
          if (res.response.status === 200) {
            return { data: res.data as Post[] }
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
      providesTags: (result: Post[] | undefined) =>
        result
          ? [
              ...result.map(({ id }): PostTag => ({ type: TAGS.POST, id })),
              { type: TAGS.POST, id: 'LIST' },
            ]
          : [{ type: TAGS.POST, id: 'LIST' }],
    }),

    getPostById: build.query({
      queryFn: async id => {
        try {
          const res = await client.GET('/posts/{id}', {
            params: {
              path: { id: Number(id) },
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
      providesTags: (result, error, id): PostTag[] => [{ type: TAGS.POST, id }],
    }),

    createPost: build.mutation({
      queryFn: async body => {
        try {
          const res = await client.POST('/posts/create-post', {
            body,
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

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { Post, PostTag } from '@/shared/schemas/types/post'
//
// export const postsApi = createApi({
//   reducerPath: 'postsApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://nodewebdev.online/api/v1' }),
//   tagTypes: ['Post'],
//   endpoints: build => ({
//     getPosts: build.query<Post[], void>({
//       query: () => '/posts',
//       providesTags: result =>
//         result
//           ? [
//               ...result.map(({ id }): PostTag => ({ type: 'Post', id })),
//               { type: 'Post' as const, id: 'LIST' },
//             ]
//           : [{ type: 'Post' as const, id: 'LIST' }],
//     }),
//
//     getPostById: build.query<Post, string>({
//       query: id => `/posts/${id}`,
//       providesTags: (result, error, id): PostTag[] =>
//         result ? [{ type: 'Post' as const, id }] : [],
//     }),
//
//     createPost: build.mutation<Post, Partial<Post>>({
//       query: payload => ({
//         url: '/posts/create-post', // TODO REST API ???
//         method: 'POST',
//         body: payload,
//       }),
//       invalidatesTags: [{ type: 'Post', id: 'LIST' }],
//     }),
//
//     updatePost: build.mutation<Post, { id: string; body: Partial<Post> }>({
//       query: ({ id, body }) => ({
//         url: `/posts/${id}`,
//         method: 'PUT',
//         body,
//       }),
//       invalidatesTags: (result, error, { id }): PostTag[] =>
//         result ? [{ type: 'Post' as const, id }] : [],
//     }),
//
//     deletePost: build.mutation<{ success: boolean }, string>({
//       query: id => ({
//         url: `/posts/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: (result, error, id): PostTag[] =>
//         result ? [{ type: 'Post' as const, id }] : [],
//     }),
//   }),
// })
//
// export const {
//   useGetPostsQuery,
//   useGetPostByIdQuery,
//   useCreatePostMutation,
//   useUpdatePostMutation,
//   useDeletePostMutation,
// } = postsApi
