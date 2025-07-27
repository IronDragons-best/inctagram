import { Post } from '@/views/profile/pages/userProfile/userPost/post/ui/post';

type Props = {
  params: Promise<{ userId: string }>;
};

const UserPage = async ({ params }: Props) => {
  const id = (await params).userId;

  return <div>
    user id: {id}
    <Post isModalOpen={true}/>
  </div>;
};

export default UserPage;
