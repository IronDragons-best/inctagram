import { client } from '@/shared/schemas/types/api/client';
import { baseApi } from '@/src/app/provider/baseApi';
import { InputsForm } from '../ui/signIn/lib/schemas/signIn';
import { Inputs } from '@/features/auth/ui/signUp/lib/schemas/signUp';
import { InputForm } from '@/features/auth/ui/forgot-password/lib/schemas/forgotPasswordForm';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      queryFn: async (body: Inputs) => {
        const res = await client.POST('/auth/registration', { body });
        return { data: res };
      },
    }),
    confirmEmail: build.mutation({
      queryFn: async (code: string) => {
        try {
          const res = await client.POST('/auth/confirm-email', {
            body: { code },
          });
          
          if (res.error) {
            return {
              error: {
                status: res.response.status,
                data: res.error.errorsMessages,
              },
            };
          }

          return { data: res.response.status };

        } catch (e) {
          return {
            error: {
              status: 500,
              data: {
                message: 'Unknown error occurred',
                details: e instanceof Error ? e.message : String(e),
              },
            },
          };
        }
      },
    }),
    expiredLink: build.mutation({
      queryFn: async (email: string) => {
        const res = await client.POST('/auth/email-resend', {
          body: { email },
        });
        return { data: res };
      },
    }),
    signIn: build.mutation({
      queryFn: async (body: InputsForm) => {
        const res = await client.POST('/auth/login', { body });
        return { data: res };
      },
    }),
    logout: build.mutation({
      queryFn: async () => {
        const res = await client.POST('/auth/logout');
        return { data: res };
      },
    }),
    me: build.query<any, void>({
      queryFn: async () => {
        const res = await client.GET('/auth/me');
        debugger;
        return { data: res };
      },
    }),
    refreshToken: build.mutation<any, void>({
      queryFn: async () => {
        const res = await client.POST('/auth/refresh-token');
        return { data: res };
      },
    }),
    reCaptcha: build.mutation({
      queryFn: async (data: InputForm) => {
        const res = await client.POST('/auth/password-recovery', {
          body: data ,
        });
        return { data: res };
      },
    }),
  }),
});

export const {
  useRegistrationMutation,
  useConfirmEmailMutation,
  useExpiredLinkMutation,
  useSignInMutation,
  useLogoutMutation,
  useMeQuery,
  useRefreshTokenMutation,
  useReCaptchaMutation,
} = authApi;
