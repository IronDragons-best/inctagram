import { useEffect, useState } from 'react'
import { formatTimeAgo } from '../utils/formatDate'

// export function useTimeAgo(time?: string | Date) {
//   const [ago, setAgo] = useState(() => formatTimeAgo(time))
//
//   useEffect(() => {
//     if (!time) return
//     const interval = setInterval(() => {
//       setAgo(formatTimeAgo(time))
//     }, 60_000)
//     return () => clearInterval(interval)
//   }, [time])
//
//   return ago
// }

export function useTimeAgo(time?: string | Date, locale = 'en') {
  const [ago, setAgo] = useState(() => formatTimeAgo(time, locale))

  useEffect(() => {
    if (!time) return

    const date = typeof time === 'string' ? new Date(time) : time

    const update = () => {
      const newAgo = formatTimeAgo(date, locale)
      setAgo(newAgo)

      // Находим, через сколько миллисекунд наступит следующая минута
      const now = Date.now()
      const msSinceLastMinute = now % 60_000
      const nextUpdateIn = 60_000 - msSinceLastMinute

      timer = setTimeout(update, nextUpdateIn)
    }

    let timer = setTimeout(update, 0)

    return () => clearTimeout(timer)
  }, [time, locale])

  return ago
}
