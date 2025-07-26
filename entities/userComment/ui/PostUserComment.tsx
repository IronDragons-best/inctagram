'use client';

import Image, { StaticImageData } from 'next/image';
import { UniversalIcon } from '@irondragons/ui-lib-inctagram';
import * as React from 'react';
import s from './postUserComment.module.scss';


type PostUserCommentProps = {
  userId?: string;
  userAvatar: string | StaticImageData;
  userName: string;
  userComment: string;
  isLiked?: boolean;
  isLikedIcon?: boolean;
  likesCount?: number;
  isAnswer?: boolean;
};

export const PostUserComment = ({
                                  userAvatar,
                                  userName,
                                  userComment,
                                  isLiked,
                                  isLikedIcon,
                                  isAnswer,
                                  likesCount = 0,
                                }: PostUserCommentProps) => {
  return (
    <div className={s.PostUserCommentWrapper}>
      <div className={s.PostUserComment}>
        <div className={s.UserAvatar}>
          <Image src={userAvatar} alt={'User avatar'} />
        </div>
        <div className={s.UserContent}>
          <div className={s.UserText}>
            <span className={s.UserName}>{userName}&nbsp;</span>
            <span className={s.UserComment}>
              {userComment}
            </span>
          </div>
        </div>
        <div className={s.LikePostIcon}>
          {isLikedIcon && (isLiked
            ? <UniversalIcon name={'heart'} dataStatic />
            : <UniversalIcon name={'heart-outline'} />)}
        </div>
      </div>
      <div className={s.PostMeta}>
        <div className={s.PostMetaTimestamp}>
          2 hours ago
        </div>
        {(likesCount > 0) && <div className={s.PostMetaLikes}>
          <span className={s.PostMetaLikesText}>Like:&nbsp;</span>
          <span className={s.PostMetaLikesCount}>{likesCount}</span>
        </div>}
        {isAnswer && <div className={s.PostMetaAction}>
          Answer
        </div>}
      </div>
    </div>
  );
};