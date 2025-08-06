'use client'

import s from './mainLayout.module.scss'
import { Header } from '@/widgets/header'
import { PATH } from '@/shared/constants/path'
import { Sidebar } from '@/widgets/sidebar'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/src/app/provider/store'
import '@irondragons/ui-lib-inctagram/dist/style.css'
import '@/src/styles/index.scss'

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
