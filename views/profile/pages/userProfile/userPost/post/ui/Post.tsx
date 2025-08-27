'use client'

import { PostUserComment } from '@/entities/userComment/'
import { PostActions } from '@/shared/ui/postActions/ui/PostActions'
import s from './post.module.scss'

import { PublicationModal } from '@/shared/modals/publicationModal'
import { LikesCount } from '@/shared/ui/likesCount/ui/LikesCount'
import { PublishComment } from '@/shared/ui/publishComment'
import { useParams } from 'next/navigation'

import photo1 from '@/public/assets/img/photo_01.png'
import photo3 from '@/public/assets/img/photo_03.jpg'
import photo5 from '@/public/assets/img/stalinLike.jpg'
import { UserHeader } from '@/shared/ui/userheader'
import { useMeQuery } from '@/features/auth/api/authApi'
import { extractUserId } from '@/shared/utils/isAuthId'

type Props = {
  isModalOpen: boolean
  postId: number
  srcArray: string[]
  userName: string
  title?: 'withPublish' | 'withoutPublish'
  slides?: string[]
  openModal?: () => void
}

export const Post = ({ isModalOpen, srcArray, postId, userName }: Props) => {
  const params = useParams<{ userId: string }>()

  const { data } = useMeQuery({})
  const currentUserId = extractUserId(data)
  const canManage = currentUserId !== null && currentUserId === params.userId

  return (
    <PublicationModal isModalOpen={isModalOpen} srcArray={srcArray}>
      <>
        <div className={s.postUserHeader}>
          <UserHeader
            postId={postId}
            userId={params.userId}
            srcArray={srcArray}
            userName={userName}
            showActions={!!canManage}
          />
        </div>
        <div className={s.postUserCommentWrapper}>
          {/* TODO переделать потом на map */}
          <PostUserComment
            userAvatar={photo1}
            userName={userName}
            userComment={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
              ' eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
          />
          <PostUserComment
            userAvatar={photo3}
            userName={'UserName'}
            userComment={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
              ' eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
            isLikedIcon
            isAnswer
          />
          <PostUserComment
            userAvatar={photo5}
            userName={'UserName'}
            userComment={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
              ' eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
            isLikedIcon
            isLiked
            isAnswer
            likesCount={1}
          />
        </div>
        <div className={s.summaryLikesWrapper}>
          <div className={s.postLikesWrapper}>
            <PostActions />
          </div>
          <div className={s.avatarGroupSummaryWrapper}>
            {/* TODO хз пока че передавать пропсами */}
            <LikesCount />
          </div>
          <div className={s.postMetaTimestamp}>July 3, 2021</div>
        </div>
        <div className={s.addPostCommentWrapper}>
          <PublishComment />
        </div>
      </>
    </PublicationModal>
  )
}
