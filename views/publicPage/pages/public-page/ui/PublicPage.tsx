'use client'

import { RegisteredUsers } from '@/shared/ui/registeredUsers'
import { UserCardList } from '@/shared/ui/userFeedCard/ui/UserCardList/UserCardList'
import s from './publicPage.module.scss'

export const PublicPage = () => {
  return (
    <div className={s.container}>
      <RegisteredUsers />
      <UserCardList />
    </div>
  )
}
