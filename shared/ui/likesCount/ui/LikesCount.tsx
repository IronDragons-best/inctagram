'use client'

import photo1 from '@/public/assets/img/photo_01.png'
import photo2 from '@/public/assets/img/photo_02.png'
import photo3 from '@/public/assets/img/photo_03.jpg'
import { clsx } from 'clsx'
import Image from 'next/image'
import s from './likesCount.module.scss'

export const LikesCount = () => {
  return (
    <div className={s.avatarGroupSummary}>
      <div className={s.avatarTriple}>
        <div className={clsx(s.userAvatar, s.one)}>
          <Image src={photo1} alt={'photo1'} />
        </div>
        <div className={clsx(s.userAvatar, s.two)}>
          <Image src={photo2} alt={'photo2'} />
        </div>
        <div className={clsx(s.userAvatar, s.three)}>
          <Image src={photo3} alt={'photo3'} />
        </div>
      </div>
      <div className={s.likesSummary}>
        <span className={s.summaryLikesCount}>{'2 243'}&nbsp;</span>
        <span className={s.summaryPostLikes}>Like</span>
      </div>
    </div>
  )
}
