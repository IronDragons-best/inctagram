import { UserProfile } from '@/views/profile/pages/userProfile'
import { PostItem, PostQueryArgs } from '@/shared/schemas/types/post'
import { extractPostSrcArray, fetchPostById, fetchPosts } from '@/shared/schemas/api/postsService'

type ParamsType = {
  userId: string
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
  const { userId } = await props.params
  const { postId, pageNumber = 1 } = await props.searchParams

  // посты пользователя (SSR)
  const postsQuery: PostQueryArgs = {
    userId: Number(userId),
    pageNumber: Number(pageNumber),
  } as PostQueryArgs
  const initialPosts: PostItem[] = await fetchPosts(postsQuery)

  // для модалки: картинки выбранного поста (SSR)
  const post = postId ? await fetchPostById(Number(postId)) : null
  const initialPostSrcArray: string[] = extractPostSrcArray(post)

  return (
    <>
      <UserProfile
        user={Number(userId)}
        postId={postId}
        initialPosts={initialPosts}
        initialPostSrcArray={initialPostSrcArray}
      />
    </>
  )
}

export default UserPage
