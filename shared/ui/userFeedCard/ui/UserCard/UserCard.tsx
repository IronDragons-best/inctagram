'use client'

import * as React from 'react'
import { useState } from 'react'
import { Slider } from '@/shared/ui/slider'
import { useTimeAgo } from '@/shared/hooks/userTimeAgo'
import { UserHeader } from '@/shared/ui/userheader'
import Link from 'next/link'
import s from './UserCard.module.scss'

type Props = {
  userTime: Date
  srcArray: string[]
  userName: string
  userContent: string
  href: string
  userId?: string
  postId?: number
}

export const UserCard = ({
  userTime,
  userContent,
  postId,
  srcArray,
  userName,
  userId,
  href,
}: Props) => {
  const [expanded, setExpanded] = useState(false)
  const timeAgo = useTimeAgo(userTime)

  const toggleText = () => {
    setExpanded(prev => !prev)
  }

  const sliderEl = <Slider srcArray={srcArray} isSmall />

  return (
    <div className={s['user-card']}>
      <div className={s['user-card__container']}>
        <div
          className={`${s['user-card__slider']} ${expanded ? s['user-card__slider--collapsed'] : ''}`}
        >
          {href ? <Link href={href}>{sliderEl}</Link> : ''}
        </div>
        <div className={s['user-card__details']}>
          <div className={s['user-card__info']}>
            <UserHeader
              userId={userId ?? ''}
              postId={postId ?? 0}
              srcArray={srcArray}
              userName={userName}
              userTime={timeAgo}
            />
          </div>
          <div className={s['user-card__time']}>{timeAgo}</div>
          <div className={s['user-card__content']}>
            <p
              className={`${s['user-card__text']} ${expanded ? s['user-card__text--expanded'] : ''}`}
            >
              {userContent}
            </p>
            <span className={s['user-card__toggle']} onClick={toggleText}>
              {expanded ? 'Hide' : 'Show more'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
