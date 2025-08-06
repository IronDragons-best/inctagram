import { client, TokenService } from '@/shared/schemas/types/api/client';
import { baseApi } from '@/src/app/provider/baseApi';
import { SignInFormTypes } from '@/views/auth/pages/signIn/lib/schemas/signIn';
import { Mutex } from 'async-mutex';
import { SignUpFormTypes } from '@/views/auth/pages/signUp/lib/schemas/signUp';
import {
  ForgotPasswordFormType
} from '@/views/auth/pages/forgot-password/lib/schemas/forgotPasswordForm';

const mutex = new Mutex();

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      queryFn: async (body: SignUpFormTypes) => {
        const res = await client.POST("/auth/registration", { body });
        return { data: res };
      },
    }),
    confirmEmail: build.mutation({
      queryFn: async (code: string) => {
        try {
          const res = await client.POST("/auth/confirm-email", {
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
                message: "Unknown error occurred",
                details: e instanceof Error ? e.message : String(e),
              },
            },
          };
        }
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
      queryFn: async (body: SignInFormTypes) => {
        const res = await client.POST("/auth/login", { body });
        return { data: res };
      },
    }),
    logout: build.mutation({
      queryFn: async () => {
        const res = await client.POST("/auth/logout");
        return { data: res };
      },
    }),
    me: build.query({
      queryFn: async () => {
        const res = await client.GET("/auth/me");
        return { data: res };
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        const release = await mutex.acquire();
        try {
          const { data } = await queryFulfilled;
          if (data.response.status === 401) {
            const { data: token } = await client.POST("/auth/refresh-token");
            if (token) {
              TokenService.setToken(token.accessToken);
               await client.GET("/auth/me");
            }
          }
        } finally {
          release();
        }
      },
    }),
    refreshToken: build.mutation({
      queryFn: async () => {
        const res = await client.POST("/auth/refresh-token");
        return { data: res };
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        const release = await mutex.acquire();
        try {
          await queryFulfilled;
        } finally {
          release();
        }
      },
    }),
    reCaptcha: build.mutation({
      queryFn: async (data: ForgotPasswordFormType) => {
        const res = await client.POST("/auth/password-recovery", {
          body: data,
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
  useReCaptchaMutation,
} = authApi;
