import { useEffect, useMemo, useState } from 'react'
import { postsApi, useGetPostsInfiniteQuery } from '@/shared/schemas/api/postsApi'
import { useAppDispatch } from '@/src/app/provider/store'
import { InfinityPostsType } from '@/views/profile/pages/userProfile/UserProfile'

type UseHydratedInfinitePostsProps = {
  userId: number
  pageSize?: number
  initialPosts?: InfinityPostsType
}

export const useHydratedInfinitePosts = ({
  userId,
  pageSize = 8,
  initialPosts,
}: UseHydratedInfinitePostsProps) => {
  const dispatch = useAppDispatch()
  const [isFirstQuery, setIsFirstQuery] = useState(true)
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } =
    useGetPostsInfiniteQuery({ userId, pageSize }, { skip: isFirstQuery })
  console.log(data)
  useEffect(() => {
    if (initialPosts) {
      dispatch(
        postsApi.util.upsertQueryData(
          'getPosts', // имя эндпоинта
          { userId, pageSize }, // аргументы, с которыми будет кешироваться
          initialPosts
        )
      )
    }
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 40
      if (nearBottom) setIsFirstQuery(false)
      if (nearBottom && hasNextPage && !isFetching) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isFetching])

  const allPosts = useMemo(() => {
    const flatInitialPosts = initialPosts?.pages.flat() ?? []
    const clientPages = data?.pages.flat() ?? []
    return isFirstQuery ? [...flatInitialPosts] : [...clientPages]
  }, [initialPosts, data])

  return {
    allPosts,
    isLoading,
    isFetching,
    isError,
    error,
  }
}
