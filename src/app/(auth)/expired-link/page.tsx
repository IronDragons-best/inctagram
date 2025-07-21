'use client';

import { EmailConfirmationPage } from "features/auth/ui/emailConfirmationPage";
import { Button, Input, UniversalIcon } from "@irondragons/ui-lib-inctagram";
import s from "./expiredLink.module.scss";
import { useExpiredLinkMutation } from '@/features/auth/api/authApi';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const ExpiredLink = () => {
  const [email, setEmail] = useState('');
  const [expiredLinkHandler] = useExpiredLinkMutation()
  
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
              onBlur={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button variant={"primary"} fullWidth={true} onClick={() => expiredLinkHandler(email)}>
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
