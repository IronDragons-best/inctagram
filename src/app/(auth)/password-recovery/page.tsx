"use client";

import s from "@/src/app/(auth)/password-recovery/passwordRecovery.module.scss";
import { Button, UniversalIcon } from "@irondragons/ui-lib-inctagram";
import { EmailConfirmationPage } from '@/views/auth/pages/emailConfirmationPage';

const PasswordRecovery = () => {
  return (
    <EmailConfirmationPage
      title="Email verification link expired"
      description="Looks like the verification link has expired. Not to worry, we can send the link again"
    >
      <>
        <div className={s.wrapper}>
          <Button variant={"primary"} fullWidth={true}>
            Resend link
          </Button>
        </div>
        <div className={s.iconWrapper}>
          <UniversalIcon name={"ExpiredLink"} dataStatic={true} />
        </div>
      </>
    </EmailConfirmationPage>
  );
};

export default PasswordRecovery;
