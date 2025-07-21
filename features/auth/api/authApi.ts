import { Inputs } from "@/features/auth/ui/signUp/lib/schemas/signUp";
import { client } from "@/shared/schemas/types/api/client";
import { baseApi } from "@/src/app/provider/baseApi";
import { InputsForm } from "../ui/signIn/lib/schemas/signIn";

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
    signIn: build.mutation({
      queryFn: async (body: InputsForm) => {
        const res = await client.POST("/auth/login", { body});
        return {data: res}
      },
    }),
  }),
});


export const {
  useRegistrationMutation,
  useConfirmEmailMutation,
  useExpiredLinkMutation,
  useSignInMutation
} = authApi;

