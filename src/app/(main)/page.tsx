import { PublicPage } from 'views/publicPage/pages/public-page/ui'
import { Post } from '@/views/profile/pages/userProfile/userPost/post'

export default function Home() {
  return (
    <>
      <PublicPage />
      <Post isModalOpen={true} srcArray={[]} />
    </>
  )
}
