import { getClient } from '@/shared/schemas/api/client'
import { baseApi, TAGS } from '@/src/app/provider/baseApi'
import { normalizeError } from '@/shared/utils/handleErrors'
import { ProfileTag, UpdateProfile } from '@/shared/schemas/types/profile'

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
      providesTags: (_result, _error, userId): ProfileTag[] => [{ type: TAGS.PROFILE, id: userId }],
    }),
    updateProfile: build.mutation({
      queryFn: async (body: UpdateProfile) => {
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
      invalidatesTags: [{ type: TAGS.PROFILE, id: 'CURRENT' }],
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
      invalidatesTags: [{ type: TAGS.PROFILE, id: 'CURRENT' }],
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
      invalidatesTags: [{ type: TAGS.PROFILE, id: 'CURRENT' }],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarProfileMutation,
  useRemoveAvatarProfileMutation,
} = profileApi
