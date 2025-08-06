'use client'

import { PropsWithChildren } from 'react'
import { store } from '@/src/app/provider/store'
import { Provider } from 'react-redux'
import s from './AuthLayout.module.scss'
import { Header } from '@/widgets/header'
import '@irondragons/ui-lib-inctagram/dist/style.css'
import '@/src/styles/index.scss'

export const AuthLayoutComponent = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <div className={s.authContent}>
        <Header isProcessingAuth={true} localization={'eng'} />
        <div className={s.formWrapper}>{children}</div>
      </div>
    </Provider>
  )
}
