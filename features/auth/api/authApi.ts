import { baseApi } from "@/src/app/provider/baseApi";
import { client } from "@/shared/schemas/types/api/client";
import { Inputs } from "@/features/auth/ui/signUp/lib/schemas/signUp";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      queryFn: async (body: Inputs) => {
        const res = await client.POST("/auth/registration", { body });
        return { data: res };
      },
    }),
    confirmEmail: build.mutation({
      queryFn: async (code: string) => {
        const res = await client.POST("/auth/confirm-email", {
          body: { code },
        });
        return { data: res };
      },
    }),
    expiredLink: build.mutation({
      queryFn: async (email: string) => {
        const res = await client.POST("/auth/email-resend", {
          body: { email },
        });
        return { data: res };
      },
    }),
    me: build.query({
      queryFn: async () => {
        const res = await client.GET("/auth/me");
        return { data: res };
      },
    }),
  }),
});

export const {
  useRegistrationMutation,
  useConfirmEmailMutation,
  useExpiredLinkMutation,
  useMeQuery,
} = authApi;
