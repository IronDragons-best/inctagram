"use client";

import s from "@/src/app/(auth)/confirm-registration/congratulations.module.scss";
import { Button, UniversalIcon } from "@irondragons/ui-lib-inctagram";
import { EmailConfirmationPage } from "features/auth/ui/emailConfirmationPage";

const Page = () => {
  return (
    <EmailConfirmationPage
      title="Congratulations!"
      description="Your email has been confirmed"
    >
      <>
        <div className={s.wrapper}>
          <Button variant={"primary"}>Sign In</Button>
        </div>
        <div className={s.iconWrapper}>
          <UniversalIcon name={"Congratulations"} dataStatic={true} />
        </div>
      </>
    </EmailConfirmationPage>
  );
};

export default Page;
