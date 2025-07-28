'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import photo1 from '@/public/assets/img/photo_01.png';
import photo2 from '@/public/assets/img/photo_02.png';
import photo3 from '@/public/assets/img/photo_03.jpg';
import * as React from 'react';

import s from './likesCount.module.scss';

type Props = {

};


export const LikesCount = ({}: Props) => {
  return (
    <div className={s.AvatarGroupSummary}>
      <div className={s.AvatarTriple}>
        <div className={clsx(s.UserAvatar, s.one)}>
          <Image src={photo1} alt={'photo1'} />
        </div>
        <div className={clsx(s.UserAvatar, s.two)}>
          <Image src={photo2} alt={'photo2'} />
        </div>
        <div className={clsx(s.UserAvatar, s.three)}>
          <Image src={photo3} alt={'photo3'} />
        </div>
      </div>
      <div className={s.LikesSummary}>
        <span className={s.SummaryLikesCount}>{'2 243'}&nbsp;</span>
        <span className={s.SummaryPostLikes}>"Like"</span>
      </div>
    </div>
  );
};