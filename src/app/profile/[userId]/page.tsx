import { Post } from "@/views/profile/pages/userProfile/userPost/post/ui/post";

import { redirect } from "next/navigation";
import { PATH } from "@/shared/constants/path";
import { UserProfile } from "@/views/profile/pages/userProfile";
import { PublicationModal } from "@/shared/modals/publicationModal";

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
  const id = (await props.params).userId;

  return (
    <div>
      <UserProfile {...props} />;
    </div>
  );
};

export default UserPage;
