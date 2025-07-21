import { handleError } from "@/shared/utils/handleError";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO: настроить теги

export const baseApi = createApi({
  reducerPath: "inctagram",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      credentials: "include",
      prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken");
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    })(args, api, extraOptions);

    handleError(api, result);
    return result;
  },
  endpoints: () => ({}),
});
