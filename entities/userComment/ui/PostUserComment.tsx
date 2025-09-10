'use client'

import { UniversalIcon } from '@irondragons/ui-lib-inctagram'
import Image, { StaticImageData } from 'next/image'
import s from './postUserComment.module.scss'

type PostUserCommentProps = {
  userId?: string
  userAvatar: string | StaticImageData
  userName: string
  userComment: string
  isLiked?: boolean
  isLikedIcon?: boolean
  likesCount?: number
  isAnswer?: boolean
}

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
    <div className={s.postUserCommentWrapper}>
      <div className={s.postUserComment}>
        <div className={s.userAvatar}>
          <Image src={userAvatar} alt={'User avatar'} />
        </div>
        <div className={s.userContent}>
          <div className={s.userText}>
            <span className={s.userName}>{userName}&nbsp;</span>
            <span className={s.userComment}>{userComment}</span>
          </div>
        </div>
        <div className={s.likePostIcon}>
          {isLikedIcon &&
            (isLiked ? (
              <UniversalIcon name={'heart'} dataStatic />
            ) : (
              <UniversalIcon name={'heart-outline'} />
            ))}
        </div>
      </div>
      <div className={s.postMeta}>
        <div className={s.postMetaTimestamp}>2 hours ago</div>
        {likesCount > 0 && (
          <div className={s.postMetaLikes}>
            <span className={s.postMetaLikesText}>Like:&nbsp;</span>
            <span className={s.postMetaLikesCount}>{likesCount}</span>
          </div>
        )}
        {isAnswer && <div className={s.postMetaAction}>Answer</div>}
      </div>
    </div>
  )
}
