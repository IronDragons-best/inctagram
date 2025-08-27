'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import UserProfilePicture from '@/public/assets/image 1.png'
import { PATH } from '@/shared/constants/path'
import { ButtonContainer } from '@/views/profile/pages/userProfile/ButtonContainer'
import { Post } from '@/views/profile/pages/userProfile/userPost/post'
import { Slider } from '@/shared/ui/slider'
import { useGetPostsInfiniteQuery } from '@/shared/schemas/api/postsApi'
import { PostItem } from '@/shared/schemas/types/post'
import s from './userProfile.module.scss'

import { DotPulse } from 'ldrs/react'
import 'ldrs/react/DotPulse.css'
import { extractUserId } from '@/shared/utils/typeGuards'
import { useMeQuery } from '@/features/auth/api/authApi'

type Props = {
  user: number
  userName: string
  initialPosts?: PostItem[]
  initialPostSrcArray?: string[]
  postId?: string
}

export type profileOwner = 'myProfile' | 'friendProfile' | 'guestProfile'

export const UserProfile = ({
  user,
  userName,
  postId,
  initialPosts,
  initialPostSrcArray,
}: Props) => {
  // const skip = !!initialPosts
  const {
    data: userInfo,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetPostsInfiniteQuery({ userId: user, pageNumber: 1 })

  const allPosts = userInfo?.pages.flatMap(page => page) ?? []

  const effectiveUserInfo = initialPosts ?? allPosts

  function getImageUrlByPostId(postId: string): string[] {
    if (!effectiveUserInfo || !postId) return []

    const post = effectiveUserInfo.find(p => String(p.id) === postId)
    return post?.previewImages ?? []
  }

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 40
      if (nearBottom && hasNextPage && !isFetching) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFetching, fetchNextPage])

  const { data: me } = useMeQuery({})
  const currentUserId = extractUserId(me)
  const canShowProfileActions = currentUserId !== null && currentUserId === String(user)

  return (
    <div className={s.profileWrapper}>
      <div className={s.headingContent}>
        <Image src={UserProfilePicture} alt={'Main image'} width={204} height={204} />
        <div className={s.userInfo}>
          <div className={s.userActions}>
            <h2>{userName}</h2>
            {canShowProfileActions && <ButtonContainer profileOwner={'myProfile'} />}
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

      {isFetching && (
        <div className={s.loaderWrapper}>
          <DotPulse size="43" speed="1.3" color="white" />
        </div>
      )}

      {effectiveUserInfo && postId && (
        <Post
          postId={Number(postId)}
          userName={userName}
          isModalOpen={!!postId}
          srcArray={initialPostSrcArray?.length ? initialPostSrcArray : getImageUrlByPostId(postId)}
        />
      )}
    </div>
  )
}
