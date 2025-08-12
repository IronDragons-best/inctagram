'use client'

import { ReactNode } from 'react'
import { MainLayoutComponent } from '@/src/common/components/mainLayout'
import { Provider } from 'react-redux'
import { store } from '@/src/app/provider/store'

// export const metadata: Metadata = defaultMetadata

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <MainLayoutComponent>{children}</MainLayoutComponent>
        </Provider>
      </body>
    </html>
  )
}
