import { useEffect, useMemo, useState } from 'react'
import { postsApi, useGetPostsInfiniteQuery } from '@/shared/schemas/api/postsApi'
import { RootState, useAppDispatch } from '@/src/app/provider/store'
import { PostItem } from '@/shared/schemas/types/post'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

type UseHydratedInfinitePostsProps = {
  userId: number
  pageSize?: number
  initialPosts?: PostItem[]
}

export const useHydratedInfinitePosts = ({
  userId,
  pageSize = 8,
  initialPosts,
}: UseHydratedInfinitePostsProps) => {
  const dispatch = useAppDispatch()
  const [isFirstQuery, setIsFirstQuery] = useState(true)

  const { fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } =
    useGetPostsInfiniteQuery({ userId, pageSize }, { skip: isFirstQuery })

  // Кладём SSR-посты в кэш и создаём подписку
  useEffect(() => {
    if (initialPosts && isFirstQuery) {
      dispatch(
        postsApi.util.upsertQueryData(
          'getPosts',
          { userId, pageSize },
          {
            pages: [initialPosts],
            pageParams: [1],
          }
        )
      )

      // Подписываем хук на кэш, чтобы useGetPostsInfiniteQuery увидел данные
      dispatch(
        postsApi.endpoints.getPosts.initiate(
          { userId, pageSize },
          { subscribe: true, forceRefetch: false }
        )
      )
    }
  }, [dispatch, initialPosts, isFirstQuery, userId, pageSize])

  // Скролл для подгрузки страниц
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 40
      if (nearBottom) setIsFirstQuery(false)
      if (nearBottom && hasNextPage && !isFetching) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isFetching, fetchNextPage])

  // Меморизируем массив постов, чтобы не было лишних ререндеров
  const selectPostsData = createSelector(
    (state: RootState) =>
      postsApi.endpoints.getPosts.select({ userId, pageSize })(state)?.data?.pages ?? [],
    pages => pages.flat()
  )

  const postsData = useSelector((state: RootState) => selectPostsData(state))

  const allPosts = useMemo(() => postsData, [postsData])

  return {
    allPosts,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  }
}
