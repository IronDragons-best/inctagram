"use client";

import s from "@/src/app/(auth)/confirm-registration/congratulations.module.scss";
import { Button, UniversalIcon } from "@irondragons/ui-lib-inctagram";
import { EmailConfirmationPage } from "features/auth/ui/emailConfirmationPage";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useConfirmEmailMutation } from "@/features/auth/api/authApi";
import { useEffect, useState } from "react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

const Page = () => {
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [confirmEmailHandler, { isLoading }] = useConfirmEmailMutation();
  const queryParams = useSearchParams();
  const confirmationCode = queryParams.get("code");

  useEffect(() => {
    if (isLoading) return;
    setIsEmailConfirmed(true);
    confirmEmailHandler(confirmationCode!)
      .unwrap()
      .then((res) => {
        const errorMessage = res.error?.errorsMessages[0]?.message;
        if (
          errorMessage === "Confirmation code is expired" ||
          errorMessage === "Invalid confirmation code"
        ) {
          redirect("/expired-link");
        } else if (errorMessage === "Email is already confirmed") {
          redirect("/sign-in");
        } else if (errorMessage === "Invalid confirmation code") {
          redirect("/sign-up");
        }
      });
  }, [isEmailConfirmed]);

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
