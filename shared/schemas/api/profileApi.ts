import { getClient } from '@/shared/schemas/api/client'
import { baseApi, TAGS } from '@/src/app/provider/baseApi'
import { normalizeError } from '@/shared/utils/handleErrors'
import { ProfileTag, ProfileViewDto, UpdateProfile } from '@/shared/schemas/types/profile'

const client = getClient()

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileViewDto, number>({
      queryFn: async (userId: number) => {
        try {
          const res = await client.GET('/profile/{userId}', {
            params: {
              path: { userId },
            },
          })

          if (res.response?.status !== 200 || !res.data) {
            return { error: normalizeError(res) }
          }
          return { data: res.data }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
      providesTags: (_result, _error, userId): ProfileTag[] => [{ type: TAGS.PROFILE, id: userId }],
    }),
    updateProfile: build.mutation<null, { userId: number; body: UpdateProfile }>({
      queryFn: async arg => {
        try {
          const { body } = arg
          const res = await client.PATCH('/profile', { body })

          if (res.response?.status === 204) {
            return { data: null }
          }

          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
      invalidatesTags: (_result, _error, { userId }): ProfileTag[] => [
        { type: TAGS.PROFILE, id: userId },
      ],
    }),
    uploadAvatarProfile: build.mutation<null, { userId: number; file: File }>({
      queryFn: async arg => {
        try {
          const { file } = arg
          const formData = new FormData()
          formData.append('avatar', file)

          const res = await client.PATCH('/profile/avatar', {
            body: formData as unknown as { avatar: string },
          })

          return res.response?.status === 204 ? { data: null } : { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
      invalidatesTags: (_result, _error, { userId }): ProfileTag[] => [
        { type: TAGS.PROFILE, id: userId },
      ],
    }),
    removeAvatarProfile: build.mutation<null, { userId: number }>({
      queryFn: async _arg => {
        try {
          const res = await client.DELETE('/profile/avatar')

          if (res.response?.status === 204) {
            return { data: null }
          }

          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
      invalidatesTags: (_result, _error, { userId }): ProfileTag[] => [
        { type: TAGS.PROFILE, id: userId },
      ],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarProfileMutation,
  useRemoveAvatarProfileMutation,
} = profileApi
