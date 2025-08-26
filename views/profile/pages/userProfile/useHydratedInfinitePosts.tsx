import { useEffect, useMemo, useState } from 'react'
import type { PostItem } from '@/shared/schemas/types/post'
import { useGetPostsInfiniteQuery } from '@/shared/schemas/api/postsApi'
import { skipToken } from '@reduxjs/toolkit/query/react'

type UseHydratedInfinitePostsProps = {
  userId: number
  pageSize?: number
  initialPosts?: PostItem[]
}

export const useHydratedInfinitePosts = ({
  userId,
  pageSize = 8,
  initialPosts = [],
}: UseHydratedInfinitePostsProps) => {
  const [enabled, setEnabled] = useState(false)

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } =
    useGetPostsInfiniteQuery(enabled ? { userId, pageNumber: 2, pageSize } : skipToken)

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 40
      if (nearBottom) setEnabled(true)
      if (nearBottom && hasNextPage && !isFetching) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isFetching])

  const allPosts = useMemo(() => {
    const clientPages = data?.pages.flat() ?? []
    return [...initialPosts, ...clientPages]
  }, [initialPosts, data])

  return {
    allPosts,
    isLoading,
    isFetching,
    isError,
    error,
  }
}
