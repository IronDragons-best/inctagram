'use client'

import { PATH } from '@/shared/constants/path'
import { Button, Selectbox, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import s from './header.module.scss'

type Props = {
  isProcessingAuth?: boolean
  localization: string
  notificationCount?: number
  isAuth?: boolean
}

export const Header = ({
  isProcessingAuth = false,
  localization,
  notificationCount = 0,
  isAuth,
}: Props) => {
  const router = useRouter()
  const convertNumber = (notificationCount: number): string => {
    return notificationCount > 9 ? `9+` : `${notificationCount}`
  }

  const redirectionHandler = (path: string) => {
    router.push(path)
  }

  return (
    <header className={s.header}>
      <div>
        <Link href={PATH.home} className={s.logo}>
          Inctagram
        </Link>
      </div>
      <div className={s.content}>
        {isAuth && (
          <div className={s.iconWrapper} data-notificationcount={convertNumber(notificationCount)}>
            <UniversalIcon name={'outline-bell'} />
          </div>
        )}
        <Selectbox
          value={localization}
          name={'aaa'}
          options={[
            { label: 'Russian', value: 'rus', icon: 'Flag-Russia' },
            { label: 'English', value: 'eng', icon: 'Flag-United-Kingdom' },
          ]}
          idProp={localization}
        />
        {!isAuth && !isProcessingAuth && (
          <>
            <Button variant="text_button" onClick={() => redirectionHandler(PATH.sign_in)}>
              Sign in
            </Button>
            <Button variant="primary" onClick={() => redirectionHandler(PATH.sign_up)}>
              Sign up
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
