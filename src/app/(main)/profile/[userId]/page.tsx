import { UserProfile } from "@/views/profile/pages/userProfile";

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

const UserPage = async (props: Props) => {
  return (
    <div>
      {/*<PublicationModal isModalOpen={true} title={'Publication'}>*/}
      {/*  <div>*/}
      {/*    1111*/}
      {/*  </div>*/}
      {/*</PublicationModal>*/}
      {/*<EditPost isModalOpen={true}/>*/}
      <UserProfile {...props} />;
    </div>
  );
};

export default UserPage;
