import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'inctagram',
  baseQuery: async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: '',
    })(args, api, extraOptions)
  },

  endpoints: () => ({}),
})
