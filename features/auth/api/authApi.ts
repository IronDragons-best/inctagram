import { baseApi } from "@/src/app/provider/baseApi";
import { client } from "@/shared/schemas/types/api/client";
import { Inputs } from "@/features/auth/ui/signUp/lib/schemas/signUp";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      query: async (body: Inputs) => {
        const res = await client.POST("/auth/registration", { body });
      },
    }),
    confirmEmail: build.mutation({
      query: async (code: string) => {
        const res = await client.POST("/auth/confirm-email", {
          body: { code },
        });
      },
    }),
    expiredLink: build.mutation({
      query: async (email: string) => {
        const res = await client.POST("/auth/email-resend", {
          body: { email },
        });
      },
    }),
  }),
});

export const {
  useRegistrationMutation,
  useConfirmEmailMutation,
  useExpiredLinkMutation,
} = authApi;
