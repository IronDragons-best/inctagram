import s from "./userProfile.module.scss";
import Image from "next/image";
import UserProfilePicture from "@/public/assets/image 1.png";
import postImage from "@/public/assets/user1.png";
import postImage2 from "@/public/assets/user2.png";
import postImage3 from "@/public/assets/user3.png";
import Link from "next/link";
import { PATH } from "@/shared/constants/path";
import { ButtonContainer } from "@/views/profile/pages/userProfile/ButtonContainer";
import { Post } from "@/views/profile/pages/userProfile/userPost/post";

type Props = {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ postId: string }>;
};

export type profileOwner = "myProfile" | "friendProfile" | "guestProfile";

const data = [
  {
    postId: "1",
    imageUrl: postImage,
  },
  {
    postId: "2",
    imageUrl: postImage2,
  },
  {
    postId: "3",
    imageUrl: postImage3,
  },
  {
    postId: "4",
    imageUrl: UserProfilePicture,
  },
  {
    postId: "5",
    imageUrl: postImage,
  },
  {
    postId: "6",
    imageUrl: postImage2,
  },
  {
    postId: "7",
    imageUrl: postImage3,
  },
  {
    postId: "8",
    imageUrl: UserProfilePicture,
  },
  {
    postId: "9",
    imageUrl: postImage,
  },
  {
    postId: "10",
    imageUrl: postImage2,
  },
  {
    postId: "11",
    imageUrl: postImage3,
  },
  {
    postId: "12",
    imageUrl: UserProfilePicture,
  },
  {
    postId: "13",
    imageUrl: postImage,
  },
  {
    postId: "14",
    imageUrl: postImage2,
  },
  {
    postId: "15",
    imageUrl: postImage3,
  },
  {
    postId: "16",
    imageUrl: UserProfilePicture,
  },
];

export const UserProfile = async ({ searchParams, params }: Props) => {
  const pr = params;
  const { postId } = await searchParams;

  return (
    <div className={s.profileWrapper}>
      <div className={s.headingContent}>
        <Image
          src={UserProfilePicture}
          alt={"Main image"}
          width={204}
          height={204}
        />
        <div className={s.userInfo}>
          <div className={s.userActions}>
            <h2>User name</h2>
            <ButtonContainer profileOwner={"myProfile"} />
          </div>

          <div className={s.userStatisticWrapper}>
            <div className={s.userStatistic}>
              <strong>2 218</strong> <span>Following</span>
            </div>
            <div className={s.userStatistic}>
              <strong>2 358</strong> <span>Followers</span>
            </div>
            <div className={s.userStatistic}>
              <strong>2 764</strong> <span>Publications</span>
            </div>
          </div>

          <div className={s.userDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
            <Link href={"#"}>
              laboris nisi ut aliquip ex ea commodo consequat.
            </Link>
          </div>
        </div>
      </div>

      <div className={s.userPosts}>
        {data.map((image, id) => (
          <Link href={`${PATH.profile}/${1}?postId=${image.postId}`} key={id}>
            <Image key={image.postId} src={image.imageUrl} alt={"image"} />
          </Link>
        ))}
      </div>

      {postId && <Post isModalOpen={!!postId} />}
    </div>
  );
};
