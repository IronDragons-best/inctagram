import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TAGS = {
  POST: 'Post',
  AUTH: 'Auth',
  PROFILE: 'Profile',
} as const

export const baseApi = createApi({
  reducerPath: 'inctagram',
  baseQuery: async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: '',
      credentials: 'include',
    })(args, api, extraOptions)
  },

  tagTypes: [TAGS.POST, TAGS.AUTH, TAGS.PROFILE],

  endpoints: () => ({}),
})
