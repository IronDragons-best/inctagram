import { redirect } from "next/navigation";
import { PATH } from "@/shared/constants/path";
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
  return <UserProfile {...props} />;
};

export default UserPage;
