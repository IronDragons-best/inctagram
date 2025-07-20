import { baseApi } from "@/src/app/provider/baseApi";
import { client } from "@/shared/schemas/types/api/client";
import { Inputs } from "@/features/auth/ui/signUp/lib/schemas/signUp";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      query: async (body: Inputs) => {
        await client.POST("/auth/registration", { body });
      },
    }),
    confirmEmail: build.mutation({
      query: async (code: string) => {
        await client.POST("/auth/confirm-email", { body: { code } });
      },
    }),
  }),
});

export const { useRegistrationMutation, useConfirmEmailMutation } = authApi;
