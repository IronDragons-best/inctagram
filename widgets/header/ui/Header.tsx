'use client'
import { Button, Selectbox, UniversalIcon } from '@irondragons/ui-lib-inctagram';

import '../../styles/index.scss'
import s from './header.module.scss'

type Props = {
  /** **Required**: Indicates if the user is authenticated */
  isAuth: boolean,
  /** Indicates if the user is authenticated */
  isProcessingAuth?: boolean,
  /** **Required**: Current selected localization value */
  localization: string,
  /** Optional number of notifications to display. If not provided, defaults to 0 */
  notificationCount?: number,
}

export const Header = ({
                         isAuth,
                         isProcessingAuth = false,
                         localization,
                         notificationCount = 0
                       }: Props) => {
  const convertNumber = (notificationCount: number): string => {
    return notificationCount > 9 ? `9+` : `${notificationCount}`
  }

  return (
    <header className={s.Header}>
      <div>
          <span className={s.Logo}>
            Inctagram
          </span>
      </div>
      <div className={s.Content}>
        {isAuth && (
          <div className={s.IconWrapper} data-notificationcount={convertNumber(notificationCount)}>
            <UniversalIcon name={'outline-bell'}/>
          </div>
        )}
        <Selectbox value={localization} name={'aaa'}
                   options={[
                     {label: 'Russian', value: 'rus', icon: 'Flag-Russia'},
                     {label: 'English', value: 'eng', icon: 'Flag-United-Kingdom'}
                   ]}
                   idProp={localization}
        />
        {!isAuth && !isProcessingAuth && (
          <>
            <Button variant='text_button'>Sign in</Button>
            <Button variant='primary'>Sign up</Button>
          </>
        )}
      </div>
    </header>
  )
}
