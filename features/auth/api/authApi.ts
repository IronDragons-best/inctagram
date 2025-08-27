import { getClient } from '@/shared/schemas/api/client'
import { createNewPasswordDto } from '@/shared/schemas/types/auth'
import { baseApi } from '@/src/app/provider/baseApi'
import { ForgotPasswordFormType } from '@/views/auth/pages/forgot-password/lib/schemas/forgotPasswordForm'
import { SignInFormTypes } from '@/views/auth/pages/signIn/lib/schemas/signIn'
import { SignUpFormTypes } from '@/views/auth/pages/signUp/lib/schemas/signUp'
import { Mutex } from 'async-mutex'
import { normalizeError } from '@/shared/utils/handleErrors'

const mutex = new Mutex()

const client = getClient()

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    registration: build.mutation({
      queryFn: async (body: SignUpFormTypes) => {
        try {
          const res = await client.POST('/auth/registration', { body })

          // 204 -> успех
          if (res.response?.status === 204) {
            return { data: undefined }
          }
          // Иначе — нормализуем ошибку (400/404/429 и т.д.)
          return {
            error: normalizeError({
              status: res.response?.status,
              data: res.error?.errorsMessages ?? res.data ?? null,
            }),
          }
        } catch (e) {
          return { error: normalizeError(e) }
        }
      },
    }),
    confirmEmail: build.mutation({
      queryFn: async (code: string) => {
        try {
          const res = await client.POST('/auth/confirm-email', { body: { code } })

          if (res.response?.status === 204) {
            return { data: undefined }
          }

          return {
            error: normalizeError({
              status: res.response?.status,
              data: res.error?.errorsMessages ?? res.data ?? null,
            }),
          }
        } catch (e) {
          return { error: normalizeError(e) }
        }
      },
    }),
    expiredLink: build.mutation({
      queryFn: async (email: string) => {
        try {
          const res = await client.POST('/auth/email-resend', { body: { email } })

          if (res.response?.status === 204) {
            return { data: undefined }
          }

          return {
            error: normalizeError({
              status: res.response?.status,
              data: res.error?.errorsMessages ?? res.data ?? null,
            }),
          }
        } catch (e) {
          return { error: normalizeError(e) }
        }
      },
    }),
    signIn: build.mutation({
      queryFn: async (body: SignInFormTypes) => {
        try {
          const res = await client.POST('/auth/login', { body })

          if (res.response?.status === 204) {
            return { data: undefined }
          }

          return {
            error: normalizeError({
              status: res.response?.status,
              data: res.error?.errorsMessages ?? res.data ?? null,
            }),
          }
        } catch (e) {
          return { error: normalizeError(e) }
        }
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
            // возможно, другой запрос уже обновил токен
            const retryClient = getClient()
            const retryRes = await retryClient.GET('/auth/me')

            if (retryRes.response.status === 200) {
              return { data: retryRes.data }
            }

            // Делаем refresh только если и повторный запрос вернул 401
            const refreshClient = getClient()
            const refreshRes = await refreshClient.POST('/auth/refresh-token')

            if (refreshRes.response.status === 200) {
              const finalClient = getClient()
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

        if (res.response.status === 204) {
          return { data: undefined }
        }

        return {
          error: {
            status: res.response.status,
            data: res.data ?? 'Password recovery error',
          },
        }
      },
    }),
    createNewPassword: build.mutation<void, createNewPasswordDto>({
      queryFn: async body => {
        try {
          const res = await client.POST('/auth/new-password', { body })

          // success
          if (res.response?.status === 204) {
            return { data: undefined }
          }

          return {
            error: normalizeError(res.error ?? { status: res.response?.status, data: res.data }),
          }
        } catch (e) {
          return { error: normalizeError(e) }
        }
      },
    }),
  }),
})

export const {
  useLazyMeQuery,
  useRegistrationMutation,
  useConfirmEmailMutation,
  useExpiredLinkMutation,
  useSignInMutation,
  useLogoutMutation,
  useMeQuery,
  useReCaptchaMutation,
  useCreateNewPasswordMutation,
} = authApi
