import { ReactNode } from 'react'
import { MainLayoutComponent } from '@/src/common/components/mainLayout'
import { Metadata } from 'next'
import { defaultMetadata } from '@/shared/lib/defaultMetadata'

export const metadata: Metadata = defaultMetadata

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MainLayoutComponent>{children}</MainLayoutComponent>
      </body>
    </html>
  )
}
