'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import UserProfilePicture from '@/public/assets/image 1.png'
import { PATH } from '@/shared/constants/path'
import { ButtonContainer } from '@/views/profile/pages/userProfile/ButtonContainer'
import { Post } from '@/views/profile/pages/userProfile/userPost/post'
import { Slider } from '@/shared/ui/slider'
import { PostItem } from '@/shared/schemas/types/post'
import s from './userProfile.module.scss'

import { DotPulse } from 'ldrs/react'
import 'ldrs/react/DotPulse.css'
import { useHydratedInfinitePosts } from './useHydratedInfinitePosts'

type Props = {
  user: number
  postId?: string
  initialPosts?: PostItem[]
  initialPostSrcArray?: string[]
}

export type profileOwner = 'myProfile' | 'friendProfile' | 'guestProfile'

export const UserProfile = ({ user, postId, initialPosts, initialPostSrcArray }: Props) => {
  console.log('from page ', initialPosts)
  const { allPosts, isFetching } = useHydratedInfinitePosts({ userId: user, initialPosts })

  function getImageUrlByPostId(postId: string): string[] {
    if (!allPosts || !postId) return []

    const post = allPosts.find(p => String(p.id) === postId)
    return post?.previewImages ?? []
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
        {allPosts ? (
          allPosts.map((u, i) => (
            <Link href={`${PATH.profile}/${user}?postId=${u.id}`} key={i}>
              <Slider isSmall srcArray={u.previewImages} />
            </Link>
          ))
        ) : (
          <div> There are no posts yet :( </div>
        )}
      </div>

      <div className={s.loaderWrapper}>
        {isFetching && <DotPulse size="43" speed="1.3" color="white" />}
      </div>

      {allPosts && postId && (
        <Post
          postId={Number(postId)}
          isModalOpen={!!postId}
          srcArray={initialPostSrcArray?.length ? initialPostSrcArray : getImageUrlByPostId(postId)}
        />
      )}
    </div>
  )
}
