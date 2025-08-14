import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TAGS = {
  POST: 'Post',
  AUTH: 'Auth',
} as const

export const baseApi = createApi({
  reducerPath: 'inctagram',
  baseQuery: async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: '',
    })(args, api, extraOptions)
  },

  tagTypes: [TAGS.POST, TAGS.AUTH],

  endpoints: () => ({}),
})
