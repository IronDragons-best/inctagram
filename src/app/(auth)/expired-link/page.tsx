"use client";

import { EmailConfirmationPage } from "features/auth/ui/emailConfirmationPage";
import { Button, Input, UniversalIcon } from "@irondragons/ui-lib-inctagram";
import s from "./expiredLink.module.scss";

const ExpiredLink = () => {
  return (
    <EmailConfirmationPage
      title="Email verification link expired"
      description="Looks like the verification link has expired. Not to worry, we can send the link again"
    >
      <>
        <div className={s.wrapper}>
          <div className={s.inputWrapper}>
            <Input
              fullWidth={true}
              inputType={"email"}
              placeholder={"Epam@epam.com"}
              label={"Email"}
            />
          </div>
          <Button variant={"primary"} fullWidth={true}>
            Resend verification link
          </Button>
        </div>
        <div className={s.iconWrapper}>
          <UniversalIcon name={"ExpiredLink"} dataStatic={true} />
        </div>
      </>
    </EmailConfirmationPage>
  );
};

export default ExpiredLink;
