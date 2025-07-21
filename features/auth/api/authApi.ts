import { Inputs } from "@/features/auth/ui/signUp/lib/schemas/signUp";
import { client } from "@/shared/schemas/types/api/client";
import { baseApi } from "@/src/app/provider/baseApi";
import { InputsForm } from "../ui/signIn/lib/schemas/signIn";

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
    signIn: build.mutation({
      queryFn: async (body: InputsForm) => {
        const res = await client.POST("/auth/login", { body});
        return {data: res}
      },
    }),
  }),
});

export const { useRegistrationMutation, useConfirmEmailMutation, useSignInMutation } = authApi;

