'use client'

import { UniversalIcon } from '@irondragons/ui-lib-inctagram'
import s from './postActions.module.scss'

type Props = {
  isMessage?: boolean
}

export const PostActions = ({ isMessage = false }: Props) => {
  return (
    <div className={s.postLikes}>
      <div className={s.iconGroup}>
        <div className={s.iconWrapper}>
          <UniversalIcon name={'heart-outline'} />
        </div>
        {isMessage && (
          <div className={s.iconWrapper}>
            <UniversalIcon name={'message-circle-outline'} />
          </div>
        )}
        <div className={s.iconWrapper}>
          <UniversalIcon name={'paper-plane-outline'} />
        </div>
      </div>
      <div className={s.iconGroup}>
        <div className={s.iconWrapper}>
          <UniversalIcon name={'bookmark-outline'} />
        </div>
      </div>
    </div>
  )
}
