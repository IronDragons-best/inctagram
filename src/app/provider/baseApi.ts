import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleError } from "@/shared/utils/handleError";

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

    handleError(api, result);
    return result;
  },
  endpoints: () => ({}),
});
