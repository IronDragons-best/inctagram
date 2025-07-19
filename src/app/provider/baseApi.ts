import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO: настроить теги

export const baseApi = createApi({
  reducerPath: "inctagram",
  keepUnusedDataFor: 60,
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      credentials: "include",
      prepareHeaders: (headers) => {
        headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem("accessToken")}`,
        );
      },
    })(args, api, extraOptions);

    return result;
  },
  endpoints: () => ({}),
});
