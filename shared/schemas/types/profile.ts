import { components } from '@/shared/schemas/api/schema'

export type UpdateProfile = components['schemas']['ProfileInputDto']
export type ProfileTag = { type: 'Profile'; id: number | 'CURRENT' }
