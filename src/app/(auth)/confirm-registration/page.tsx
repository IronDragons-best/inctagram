"use client";

import s from "./congratulations.module.scss";
import { Button, UniversalIcon } from "@irondragons/ui-lib-inctagram";
import { redirect, useSearchParams } from "next/navigation";
import { useConfirmEmailMutation } from "@/features/auth/api/authApi";
import { useEffect, useState } from "react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { EmailConfirmationPage } from '@/views/auth/pages/emailConfirmationPage';

const Page = () => {
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [confirmEmailHandler] = useConfirmEmailMutation();
  const queryParams = useSearchParams();
  const confirmationCode = queryParams.get("code");

  useEffect(() => {
    confirmEmailHandler(confirmationCode!)
      .unwrap()
      .then(() => {
        setIsEmailConfirmed(true);
      })
      .catch((res) => {
        const errorMessage = res.data[0].message;
        if (
          errorMessage === "Confirmation code is expired" ||
          errorMessage === "Invalid confirmation code"
        ) {
          redirect("/expired-link");
        } else if (errorMessage === "Email is already confirmed") {
          redirect("/sign-in");
        } else if (
          errorMessage === "User does not exist" ||
          errorMessage === "code should not be empty"
        ) {
          redirect("/sign-up");
        }
      });
  }, []);

  if (!isEmailConfirmed) {
    return <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="white" />;
  }

  return (
    <EmailConfirmationPage
      title="Congratulations!"
      description="Your email has been confirmed"
    >
      <>
        <div className={s.wrapper}>
          <Button variant={"primary"} onClick={() => redirect("/sign-in")}>
            Sign In
          </Button>
        </div>
        <div className={s.iconWrapper}>
          <UniversalIcon name={"Congratulations"} dataStatic={true} />
        </div>
      </>
    </EmailConfirmationPage>
  );
};

export default Page;
