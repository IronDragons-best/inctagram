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
      <UserProfile {...props} />
    </div>
  );
};

export default UserPage;
