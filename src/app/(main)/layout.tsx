import { ReactNode } from 'react'
import { Metadata } from 'next'
import { defaultMetadata } from '@/shared/lib/defaultMetadata'
import { MainLayoutComponent } from '@/src/common/components/mainLayout'
import { LayoutWithProvider } from '@/src/common/components/layoutWithProvider'

export const metadata: Metadata = defaultMetadata

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutWithProvider component={MainLayoutComponent}>{children}</LayoutWithProvider>
      </body>
    </html>
  )
}
