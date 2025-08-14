import { useEffect } from 'react'

export const useFavicon = () => {
  useEffect(() => {
    const setFavicon = (theme: 'light' | 'dark') => {
      const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement
      if (favicon) {
        favicon.href = theme === 'dark' ? '/icons/lightIcon.svg' : '/icons/darkIcon.svg'
      }
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateFavicon = () => setFavicon(mediaQuery.matches ? 'dark' : 'light')

    updateFavicon()
    mediaQuery.addEventListener('change', updateFavicon)

    return () => {
      mediaQuery.removeEventListener('change', updateFavicon)
    }
  }, [])
}
