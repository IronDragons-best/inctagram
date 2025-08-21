'use client'

import UserProfilePicture from '@/public/assets/image 1.png'
import postImage from '@/public/assets/user1.png'
import postImage2 from '@/public/assets/user2.png'
import postImage3 from '@/public/assets/user3.png'
import { PATH } from '@/shared/constants/path'
import { ButtonContainer } from '@/views/profile/pages/userProfile/ButtonContainer'
import { Post } from '@/views/profile/pages/userProfile/userPost/post'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import s from './userProfile.module.scss'

export type profileOwner = 'myProfile' | 'friendProfile' | 'guestProfile'

const data = [
  {
    postId: 1,
    imageUrl: postImage,
  },
  {
    postId: 2,
    imageUrl: postImage2,
  },
  {
    postId: 3,
    imageUrl: postImage3,
  },
  {
    postId: 4,
    imageUrl: UserProfilePicture,
  },
]

export const UserProfile = () => {
  const searchParams = useSearchParams()

  const postId = searchParams.get('postId') ?? undefined
  const [posts, setPosts] = useState(data)

  function handleDeletePost(id: number) {
    setPosts(prev => prev.filter(post => post.postId !== id))
  }

  function getImageUrlByPostId(postId: string) {
    const found = posts.find(item => String(item.postId) === postId)?.imageUrl
    return typeof found === 'string' ? found : found?.src
  }

  return (
    <div className={s.profileWrapper}>
      <div className={s.headingContent}>
        <Image src={UserProfilePicture} alt={'Main image'} width={204} height={204} />
        <div className={s.userInfo}>
          <div className={s.userActions}>
            <h2>User name</h2>
            <ButtonContainer profileOwner={'myProfile'} />
          </div>

          <div className={s.userStatisticWrapper}>
            <div className={s.userStatistic}>
              <strong>2 218</strong> <span>Following</span>
            </div>
            <div className={s.userStatistic}>
              <strong>2 358</strong> <span>Followers</span>
            </div>
            <div className={s.userStatistic}>
              <strong>2 764</strong> <span>Publications</span>
            </div>
          </div>

          <div className={s.userDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco
            <Link href={'#'}>laboris nisi ut aliquip ex ea commodo consequat.</Link>
          </div>
        </div>
      </div>

      <div className={s.userPosts}>
        {posts.map(post => (
          <Link href={`${PATH.profile}/${6}?postId=${post.postId}`} key={post.postId}>
            <Image src={post.imageUrl} alt={'image'} />
          </Link>
        ))}
      </div>
      {/*TODO Поправить типизацию. В йункцию может не прийти объект и тогда будет undefined*/}
      {postId && (
        <Post
          isModalOpen={!!postId}
          srcArray={[getImageUrlByPostId(postId)!]}
          postId={+postId}
          onDelete={handleDeletePost}
        />
      )}
    </div>
  )
}
