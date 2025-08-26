import { getClient } from '@/shared/schemas/api/client'
import { components } from '@/shared/schemas/api/schema'

type OutputStatsViewDto = components['schemas']['OutputStatsViewDto']
export async function fetchStats(): Promise<OutputStatsViewDto | null> {
  const client = getClient()

  const res = await client.GET('/stats', {})

  if (res.response.status === 200 && res.data) {
    return res.data
  }
  return null
}

export async function fetchRegisteredUsersCount(): Promise<number> {
  const data = await fetchStats()
  return data?.totalUsersCount ?? 0
}

export async function fetchTotalPostsCount(): Promise<number> {
  const data = await fetchStats()
  return data?.totalPostsCount ?? 0
}
