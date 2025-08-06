import { ReactNode } from 'react'

import { AuthLayoutComponent } from 'src/common/components/authLayout'
import { Metadata } from 'next'
import { defaultMetadata } from '@/shared/lib/defaultMetadata'

export const metadata: Metadata = defaultMetadata

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthLayoutComponent>{children}</AuthLayoutComponent>
      </body>
    </html>
  )
}
