import { ReactNode } from 'react'

import { AuthLayoutComponent } from 'src/common/components/authLayout'
import { Metadata } from 'next'
import { defaultMetadata } from '@/shared/lib/defaultMetadata'
import { LayoutWithProvider } from '@/src/common/components/layoutWithProvider'

export const metadata: Metadata = defaultMetadata

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutWithProvider component={AuthLayoutComponent}>{children}</LayoutWithProvider>
      </body>
    </html>
  )
}
