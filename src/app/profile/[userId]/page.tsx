

import { redirect } from "next/navigation";
import { PATH } from "@/shared/constants/path";
import { UserProfile } from "@/views/profile/pages/userProfile";
import { Post } from '@/views/profile/pages/userProfile/userPost/post';
import { EditPost } from '@/views/profile/pages/userProfile/userPost/editPost';
import { PublicationModal } from '@/shared/modals/publicationModal';


type ParamsType = {
  userId: string;
};

type SearchParams = {
  postId: string;
};

type Props = {
  params: Promise<ParamsType>;
  searchParams: Promise<SearchParams>;
};

const UserPage = async ({ params }: Props) => {
  const id = (await params).userId;
  
  return <div>
    user id: {id}
    {/*<PublicationModal isModalOpen={true} title={'Publication'}>*/}
    {/*  <div>*/}
    {/*    1111*/}
    {/*  </div>*/}
    {/*</PublicationModal>*/}
  {/*<EditPost isModalOpen={true}/>*/}
  <Post isModalOpen={true} />
  </div>;
  // const UserPage = async (props: Props) => {
  //   return <UserProfile {...props} />;
  // };
}

export default UserPage;
