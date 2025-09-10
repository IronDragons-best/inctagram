// export const formatTimeAgo = (time?: string | Date) => {
//   if (!time) return 'Just now'
//
//   if (typeof time === 'string') return time
//
//   const diffMinutes = Math.floor((Date.now() - time.getTime()) / (1000 * 60))
//   if (diffMinutes < 60) return `${diffMinutes} minutes ago`
//
//   const diffHours = Math.floor(diffMinutes / 60)
//   return `${diffHours} hours ago`
// }

export function formatTimeAgo(time?: string | Date, locale = 'en'): string {
  if (!time) return 'Just now'

  const date = typeof time === 'string' ? new Date(time) : time
  const diffMs = Date.now() - date.getTime()

  const minutes = Math.floor(diffMs / 60_000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`
  if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`

  // Если прошло больше 4 недель – показываем дату
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: new Date().getFullYear() !== date.getFullYear() ? 'numeric' : undefined,
  })
}
