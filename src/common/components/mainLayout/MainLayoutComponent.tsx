'use client'

import { PropsWithChildren } from 'react'
import '@irondragons/ui-lib-inctagram/dist/style.css'
import '@/src/styles/index.scss'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import s from './mainLayout.module.scss'
import { useMeQuery } from '@/features/auth/api/authApi'
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import { GlobalAlert } from '@/shared/ui/globalAlert/ui/GlobalAlert'

export const MainLayoutComponent = ({ children }: PropsWithChildren) => {
  const { data, isLoading } = useMeQuery({})

  if (isLoading) {
    return (
      <div className={s.loader}>
        <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="white" />
      </div>
    )
  }

  const isUserAuthorized = !!data
  return (
    <div className={s.rootLayout}>
      <Header isAuth={isUserAuthorized} localization={'eng'} />
      <div className={s.display}>
        {isUserAuthorized && <Sidebar />}
        <div className={s.mainWrapper} data-isuserauthorized={isUserAuthorized}>
          {children}
          <GlobalAlert />
        </div>
      </div>
    </div>
  )
}
