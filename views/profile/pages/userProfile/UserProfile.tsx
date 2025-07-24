import styles from "./userProfile.module.scss";
import Image from "next/image";
import UserProfilePicture from "@/public/assets/image 1.png";
import Link from "next/link";

type Props = {};

export const UserProfile = ({}: Props) => {
  return (
    <div className={styles.mainWrapper} data-isuserauthorized={true}>
      <div className={styles.headingContent}>
        <Image
          src={UserProfilePicture}
          alt={"Main image"}
          width={204}
          height={204}
        />
        <div className={styles.userInfo}>
          <h2>User name</h2>
          <div className={styles.userStatisticWrapper}>
            <div className={styles.userStatistic}>
              <strong>2 218</strong> <span>Following</span>
            </div>
            <div className={styles.userStatistic}>
              <strong>2 358</strong> <span>Followers</span>
            </div>
            <div className={styles.userStatistic}>
              <strong>2 764</strong> <span>Publications</span>
            </div>
          </div>

          <div className={styles.userDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
            <Link href={"#"}>
              laboris nisi ut aliquip ex ea commodo consequat.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
