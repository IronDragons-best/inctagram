'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { PATH } from '@/shared/constants/path'
import s from './agreementsLayout.module.scss'

function AgreementsLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const backPath = sessionStorage.getItem('fromPage') || PATH.sign_up

  return (
    <div className={s.wrapper}>
      <button className={s.btn} onClick={() => router.push(backPath)}>
        <div className={s.iconWrapper}>
          <UniversalIcon name={'arrow-back-outline'} />
        </div>
        <span>Back to Sign Up</span>
      </button>
      {children}
    </div>
  )
}

export default AgreementsLayout
