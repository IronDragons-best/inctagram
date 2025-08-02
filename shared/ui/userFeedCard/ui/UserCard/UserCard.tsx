'use client'

import { Slider } from '@/shared/ui/slider'
import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import s from './UserCard.module.scss'

import photo1 from '@/public/assets/img/photo_01.png'
import photo2 from '@/public/assets/img/photo_02.png'
import photo3 from '@/public/assets/img/photo_03.jpg'
import photo4 from '@/public/assets/img/photo_04.png'
import photo5 from '@/public/assets/img/stalinLike.jpg'
import { useTimeAgo } from '@/shared/hooks/userTimeAgo'

const photosArray = [photo1, photo2, photo3, photo4, photo5]

type Props = {
  userId?: string
  userAvatar: string | StaticImageData
  userName: string
  userTime: Date
  userContent?: string
}

export const UserCard = ({ userAvatar, userName, userTime, userContent }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const timeAgo = useTimeAgo(userTime)

  const toggleText = () => {
    setExpanded(prev => !prev)
  }

  return (
    <div className={s['user-card']}>
      <div className={s['user-card__container']}>
        <div className={`${s['user-card__slider']} ${expanded ? s['user-card__slider--collapsed'] : ''}`}>
          <Slider srcArray={photosArray} />
        </div>
        <div className={s['user-card__details']}>
          <div className={s['user-card__info']}>
            <div className={s['user-card__avatar']}>
              <Image src={userAvatar} alt={'User avatar'} />
            </div>
            <div className={s['user-card__userName']}>{userName}</div>
          </div>
          <div className={s['user-card__time']}>{timeAgo}</div>
          <div className={s['user-card__content']}>
            <p className={`${s['user-card__text']} ${expanded ? s['user-card__text--expanded'] : ''}`}>{userContent}</p>
            <span className={s['user-card__toggle']} onClick={toggleText}>
              {expanded ? 'Hide' : 'Show more'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
