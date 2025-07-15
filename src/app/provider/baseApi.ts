import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO: настроить теги, засетать headers

export const baseApi = createApi({
  reducerPath: "inctagram",
  keepUnusedDataFor: 120,
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      credentials: "include",
      prepareHeaders: (headers) => {
        headers.set("API-KEY", "[our API key]");
        headers.set("Authorization", `Bearer [our token]`);
      },
    })(args, api, extraOptions);

    return result;
  },
  endpoints: () => ({}),
});
