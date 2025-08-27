import { getClient } from '@/shared/schemas/api/client'
import { baseApi } from '@/src/app/provider/baseApi'
import { normalizeError } from '@/shared/utils/handleErrors'

const client = getClient()

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query({
      queryFn: async (userId: number) => {
        try {
          const res = await client.GET('/profile/{userId}', {
            params: {
              path: { userId },
            },
          })

          if (res.response?.status === 200) {
            return { data: res.data }
          }

          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
    }),
    updateProfile: build.mutation({
      queryFn: async body => {
        try {
          const res = await client.PATCH('/profile', { body })

          if (res.response?.status === 204) {
            return { data: undefined }
          }

          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
    }),
    uploadAvatarProfile: build.mutation({
      queryFn: async (file: File) => {
        try {
          const formData = new FormData()
          formData.append('avatar', file)

          const res = await client.PATCH('/profile/avatar', {
            body: formData as unknown as { avatar: string },
          })

          if (res.response?.status === 204) {
            return { data: undefined }
          }

          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
    }),
    removeAvatarProfile: build.mutation({
      queryFn: async () => {
        try {
          const res = await client.DELETE('/profile/avatar')

          if (res.response?.status === 204) {
            return { data: undefined }
          }

          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarProfileMutation,
  useRemoveAvatarProfileMutation,
} = profileApi
