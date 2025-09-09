import { components } from '@/shared/schemas/api/schema'

export type UpdateProfile = components['schemas']['ProfileInputDto']
export type ProfileViewDto = components['schemas']['ProfileViewDto']
export type ProfileTag = { type: 'Profile'; id: number }
