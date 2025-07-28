"use client";

import { profileOwner } from "@/views/profile/pages/userProfile/UserProfile";
import styles from "./userProfile.module.scss";
import { Button } from "@irondragons/ui-lib-inctagram";
import { redirect } from "next/navigation";
import { PATH } from "@/shared/constants/path";

type Props = {
  profileOwner: profileOwner;
};

// TODO обработчики на подписаться / отписаться / отправить сообщение

export const ButtonContainer = ({ profileOwner }: Props) => {
  const pathHandler = () => {
    redirect(PATH.settings);
  };

  return (
    <div className={styles.buttonWrapper}>
      {profileOwner === "myProfile" ? (
        <Button variant={"secondary"} onClick={pathHandler}>
          Profile Settings
        </Button>
      ) : profileOwner === "friendProfile" ? (
        <>
          <Button variant={"primary"}>Follow</Button>
          <Button variant={"secondary"}>Send Message</Button>
        </>
      ) : (
        <>
          <Button variant={"outline"}>Unfollow</Button>
          <Button variant={"secondary"}>Send Message</Button>
        </>
      )}
    </div>
  );
};
