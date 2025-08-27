'use client'

import { UserCard } from '@/shared/ui/userFeedCard'
import s from './UserCardList.module.scss'
import { PostItem } from '@/shared/schemas/types/post'
import { PATH } from '@/shared/constants/path'

type Props = {
  items: PostItem[]
}

export const UserCardList = ({ items }: Props) => {
  if (!items.length) {
    return <div>No posts</div>
  }

  return (
    <div className={s['user-card-list']}>
      {items.map(p => {
        const href = `${PATH.profile}/${p.user.userId}?postId=${p.id}`
        return (
          <UserCard
            key={p.id}
            userId={String(p.user.userId)}
            userTime={new Date(p.createdAt)}
            userContent={p.description}
            postId={p.id}
            srcArray={p.previewImages}
            userName={p.user?.username}
            href={href}
          />
        )
      })}
    </div>
  )
}
