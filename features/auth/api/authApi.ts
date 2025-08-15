import { SignInFormTypes } from '@/views/auth/pages/signIn/lib/schemas/signIn'
import { Mutex } from 'async-mutex'
import { SignUpFormTypes } from '@/views/auth/pages/signUp/lib/schemas/signUp'
import { ForgotPasswordFormType } from '@/views/auth/pages/forgot-password/lib/schemas/forgotPasswordForm'
import { baseApi } from '@/src/app/provider/baseApi'
import { getClient, TokenService } from '@/shared/schemas/api/client'

const mutex = new Mutex()

const token = TokenService.getToken()
const client = getClient(token)

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    registration: build.mutation({
      queryFn: async (body: SignUpFormTypes) => {
        const res = await client.POST('/auth/registration', { body })
        return { data: res }
      },
    }),
    confirmEmail: build.mutation({
      queryFn: async (code: string) => {
        try {
          const res = await client.POST('/auth/confirm-email', {
            body: { code },
          })

          if (res.error) {
            return {
              error: {
                status: res.response.status,
                data: res.error.errorsMessages,
              },
            }
          }
          return { data: res.response.status }
        } catch (e) {
          return {
            error: {
              status: 500,
              data: {
                message: 'Unknown error occurred',
                details: e instanceof Error ? e.message : String(e),
              },
            },
          }
        }
      },
    }),
    expiredLink: build.mutation({
      queryFn: async (email: string) => {
        const res = await client.POST('/auth/email-resend', {
          body: { email },
        })
        return { data: res }
      },
    }),
    signIn: build.mutation({
      queryFn: async (body: SignInFormTypes) => {
        const res = await client.POST('/auth/login', { body })
        return { data: res }
      },
    }),
    logout: build.mutation({
      queryFn: async () => {
        const res = await client.POST('/auth/logout')
        return { data: res }
      },
    }),
    me: build.query({
      queryFn: async () => {
        await mutex.waitForUnlock()
        const res = await client.GET('/auth/me')

        // Если всё ок — возвращаем
        if (res.response.status === 200) {
          return { data: res.data }
        }

        // Если не авторизован — пробуем обновить токен
        if (res.response.status === 401) {
          const release = await mutex.acquire()

          try {
            const latestToken = TokenService.getToken() // возможно, другой запрос уже обновил токен
            const retryClient = getClient(latestToken)
            const retryRes = await retryClient.GET('/auth/me')

            if (retryRes.response.status === 200) {
              return { data: retryRes.data }
            }

            // Делаем refresh только если и повторный запрос вернул 401
            const refreshClient = getClient(latestToken)
            const refreshRes = await refreshClient.POST('/auth/refresh-token')

            if (refreshRes.response.status === 200 && refreshRes.data?.accessToken) {
              TokenService.setToken(refreshRes.data.accessToken)

              const finalClient = getClient(refreshRes.data.accessToken)
              const finalRes = await finalClient.GET('/auth/me')

              if (finalRes.response.status === 200) {
                return { data: finalRes.data }
              }

              return {
                error: {
                  status: finalRes.response.status,
                  data: finalRes.data ?? 'Error after token update',
                },
              }
            } else {
              return {
                error: {
                  status: refreshRes.response.status,
                  data: refreshRes.data ?? "Couldn't update token",
                },
              }
            }
          } finally {
            release() // освобождаем мьютекс
          }
        }

        // Все остальные ошибки
        return {
          error: {
            status: res.response.status,
            data: res.data ?? 'Unknown error occurred',
          },
        }
      },
    }),
    reCaptcha: build.mutation({
      queryFn: async (data: ForgotPasswordFormType) => {
        const res = await client.POST('/auth/password-recovery', {
          body: data,
        })
        return { data: res }
      },
    }),
  }),
})

export const {
  useRegistrationMutation,
  useConfirmEmailMutation,
  useExpiredLinkMutation,
  useSignInMutation,
  useLogoutMutation,
  useMeQuery,
  useReCaptchaMutation,
} = authApi
