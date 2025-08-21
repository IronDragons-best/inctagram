import { UserProfile } from '@/views/profile/pages/userProfile'

type ParamsType = {
  userId: string
}

type SearchParams = {
  postId: string
}

type Props = {
  params: Promise<ParamsType>
  searchParams: Promise<SearchParams>
}

const UserPage = async (props: Props) => {
  const { userId } = await props.params
  const { postId } = await props.searchParams

  return (
    <>
      <UserProfile user={Number(userId)} postId={postId} />
    </>
  )
}

export default UserPage
