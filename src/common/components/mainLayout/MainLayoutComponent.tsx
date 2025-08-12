'use client'

import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import '@irondragons/ui-lib-inctagram/dist/style.css'
import '@/src/styles/index.scss'
import { store } from '@/src/app/provider/store'
import { PATH } from '@/shared/constants/path'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { usePathname } from 'next/navigation'
import s from './mainLayout.module.scss'

export const MainLayoutComponent = ({ children }: PropsWithChildren) => {
  const path = usePathname()

  return (
    <Provider store={store}>
      <div className={s.rootLayout}>
        <Header localization={'eng'} />
        <div className={s.display}>
          {path !== PATH.sign_up && <Sidebar />}
          <div className={s.mainWrapper} data-isuserauthorized={false}>
            {children}
          </div>
        </div>
      </div>
    </Provider>
  )
}
