'use client'

import * as React from 'react'
import { useState } from 'react'
import { Slider } from '@/shared/ui/slider'
import { useTimeAgo } from '@/shared/hooks/userTimeAgo'
import { UserHeader } from '@/shared/ui/userheader'
import Link from 'next/link'
import s from './userCard.module.scss'

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
    <div className={s.userCard}>
      <div className={s.container}>
        <div className={`${s.slider} ${expanded ? s.collapsed : ''}`}>
          {href ? <Link href={href}>{sliderEl}</Link> : ''}
        </div>
        <div className={s.details}>
          <div className={s.info}>
            <UserHeader
              userId={userId ?? ''}
              postId={postId ?? 0}
              srcArray={srcArray}
              userName={userName}
              userTime={timeAgo}
            />
          </div>
          <div className={s.time}>{timeAgo}</div>
          <div className={s.content}>
            <p className={`${s.text} ${expanded ? s.expanded : ''}`}>{userContent}</p>
            <span className={s.toggle} onClick={toggleText}>
              {expanded ? 'Hide' : 'Show more'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
