import { PATH } from '@/shared/constants/path'

export const profilePostHref = (userId: string | number, postId: string | number) => {
  const uid = encodeURIComponent(String(userId))
  const qs = new URLSearchParams({ postId: String(postId) }).toString()
  return `${PATH.profile}/${uid}?${qs}`
}
