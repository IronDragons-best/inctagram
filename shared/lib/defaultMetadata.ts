import type { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: 'Inctagram',
  description: 'Iron dragons app',
  icons: [
    {
      rel: 'icon',
      url: '/icons/lightIcon.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      url: '/icons/darkIcon.svg',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'icon',
      url: '/icons/lightIcon.svg',
    },
  ],
}
