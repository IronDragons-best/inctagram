'use client'

import { mockUsers } from '@/shared/mocks/userFeed/mockData'
import { UserCard } from '@/shared/ui/userFeedCard'
import s from './UserCardList.module.scss'

export const UserCardList = () => {
  return (
    <div className={s['user-card-list']}>
      {mockUsers.map(user => (
        <UserCard key={user.userId} {...user} />
      ))}
    </div>
  )
}
