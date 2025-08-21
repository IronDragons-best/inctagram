'use client'

import { PostUserComment } from '@/entities/userComment/'
import { PostActions } from '@/shared/ui/postActions/ui/PostActions'
import s from './post.module.scss'

import { PublicationModal } from '@/shared/modals/publicationModal'
import { LikesCount } from '@/shared/ui/likesCount/ui/LikesCount'
import { PublishComment } from '@/shared/ui/publishComment'
import { useParams, useRouter } from 'next/navigation'

import photo1 from '@/public/assets/img/photo_01.png'
import photo3 from '@/public/assets/img/photo_03.jpg'
import photo5 from '@/public/assets/img/stalinLike.jpg'
import { PATH } from '@/shared/constants/path'
import { UserHeader } from '@/shared/ui/userheader'

// const _photosArray: string[] = [photo1.src, photo2.src, photo3.src, photo4.src, photo5.src]

type Props = {
  openModal?: () => void
  isModalOpen: boolean
  postId: number
  title?: 'withPublish' | 'withoutPublish'
  slides?: string[]
  srcArray: string[]
  onDelete: (id: number) => void
}

export const Post = ({ isModalOpen, srcArray, postId, onDelete }: Props) => {
  // const [modalOpen, setModalOpen] = useState(isModalOpen)

  const router = useRouter()
  const params = useParams<{ userId: string }>()

  const handleCloseModal = () => {
    const url = `${PATH.profile}/${params.userId}`
    router.replace(url, { scroll: false })
  }

  const handleDeleteSuccess = () => {
    onDelete(postId)
    handleCloseModal()
  }
  return (
    <PublicationModal isModalOpen={isModalOpen} openModal={handleCloseModal} srcArray={srcArray}>
      <>
        <div className={s.PostUserHeader}>
          <UserHeader
            postId={postId}
            userId={params.userId}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
        <div className={s.PostUserCommentWrapper}>
          {/* TODO переделать потом на map */}
          <PostUserComment
            userAvatar={photo1}
            userName={'UserName'}
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
        <div className={s.SummaryLikesWrapper}>
          <div className={s.PostLikesWrapper}>
            <PostActions />
          </div>
          <div className={s.AvatarGroupSummaryWrapper}>
            {/* TODO хз пока че передавать пропсами */}
            <LikesCount />
          </div>
          <div className={s.PostMetaTimestamp}>July 3, 2021</div>
        </div>
        <div className={s.AddPostCommentWrapper}>
          <PublishComment />
        </div>
      </>
    </PublicationModal>
  )
}
