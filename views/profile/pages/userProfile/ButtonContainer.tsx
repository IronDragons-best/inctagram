'use client'

import { PATH } from '@/shared/constants/path'
import { profileOwner } from '@/views/profile/pages/userProfile/UserProfile'
import { Button } from '@irondragons/ui-lib-inctagram'
import { redirect } from 'next/navigation'
import s from './userProfile.module.scss'
import { useMeQuery } from '@/features/auth/api/authApi'

type Props = {
  profileOwner: profileOwner
}

// TODO обработчики на подписаться / отписаться / отправить сообщение

export const ButtonContainer = ({ profileOwner }: Props) => {
  const { data: me } = useMeQuery({})
  const userId = me?.id
  const pathHandler = () => {
    if (!userId) return
    redirect(PATH.profile_settings(userId))
  }

  return (
    <div className={s.buttonWrapper}>
      {profileOwner === 'myProfile' ? (
        <Button variant={'secondary'} onClick={pathHandler}>
          Profile Settings
        </Button>
      ) : profileOwner === 'friendProfile' ? (
        <>
          <Button variant={'outline'}>Unfollow</Button>
          <Button variant={'secondary'}>Send Message</Button>
        </>
      ) : (
        <>
          <Button variant={'primary'}>Follow</Button>
          <Button variant={'secondary'}>Send Message</Button>
        </>
      )}
    </div>
  )
}
