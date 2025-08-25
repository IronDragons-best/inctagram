'use client'

import React from 'react'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

export const PublicAuthorizedUser = () => {
  return (
    <div>
      <Header isAuth={false} isProcessingAuth localization={'eng'} />
      <Sidebar />
    </div>
  )
}
