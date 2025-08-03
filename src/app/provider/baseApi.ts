import { handleError } from "@/shared/utils/handleError";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { client } from "@/shared/schemas/types/api/client";
// TODO: настроить теги

const mutex = new Mutex();

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

    await mutex.waitForUnlock();
    debugger;
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await client.POST("/auth/refresh-token");
        if (refreshResult.data) {
          debugger;
          // api.dispatch(tokenReceived(refreshResult.data))
          // retry the initial query
          // result = await baseQuery(args, api, extraOptions)
        } else {
          debugger;
          // api.dispatch(loggedOut())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      // result = await baseQuery(args, api, extraOptions)
    }

    debugger;
    handleError(api, result);
    return result;
  },

  endpoints: () => ({}),
});
