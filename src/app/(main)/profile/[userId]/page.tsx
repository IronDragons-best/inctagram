import { UserProfile } from '@/views/profile/pages/userProfile'
import { PostItem, PostQueryArgs } from '@/shared/schemas/types/post'
import { extractPostSrcArray, fetchPostById, fetchPosts } from '@/shared/services/postsService'

export const dynamic = 'force-dynamic'

type ParamsType = {
  userId: string
  userName: string
}

type SearchParams = {
  postId: string
  pageNumber: string
}

type Props = {
  params: Promise<ParamsType>
  searchParams: Promise<SearchParams>
}

const UserPage = async (props: Props) => {
  const { userId, userName } = await props.params
  const { postId } = await props.searchParams

  // посты пользователя (SSR)
  const postsQuery: PostQueryArgs = {
    userId: Number(userId),
    pageSize: 8,
  } as PostQueryArgs
  const initialPosts: PostItem[] = await fetchPosts(postsQuery)

  const infiniteData = {
    pages: [initialPosts],
    pageParams: [1],
  }

  // для модалки: картинки выбранного поста (SSR)
  const post = postId ? await fetchPostById(Number(postId)) : null
  const initialPostSrcArray: string[] = extractPostSrcArray(post)

  const resolvedUserName = userName || post?.user?.username || initialPosts[0]?.user?.username || ''

  return (
    <>
      <UserProfile
        user={Number(userId)}
        postId={postId}
        userName={resolvedUserName}
        initialPosts={infiniteData}
        initialPostSrcArray={initialPostSrcArray}
      />
    </>
  )
}

export default UserPage
