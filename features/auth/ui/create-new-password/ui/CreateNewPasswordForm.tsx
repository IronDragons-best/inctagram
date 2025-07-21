"use client";

import { Button, Card, Input } from "@irondragons/ui-lib-inctagram";
import s from "./createNewPassword.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  passwordConfirmationSchema,
  InputError,
} from "@/features/auth/ui/create-new-password/lib/schemas/passwordConfirmation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";

export const CreateNewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputError>({
    resolver: zodResolver(passwordConfirmationSchema),
    mode: "onBlur",
  });
  const onSubmitHandler: SubmitHandler<InputError> = (data) =>
    console.log(data);

  return (
    <Card>
      <div className={s.formWrapper}>
        <h2 className={s.formTitle}>Create New Password</h2>

        <form onSubmit={handleSubmit(onSubmitHandler)} className={s.form}>
          <Input
            id={"newPassword"}
            inputType={"password"}
            label={"New password"}
            placeholder={"New password"}
            fullWidth={true}
            {...register("password")}
          />
          <Input
            id={"confirmationPassword"}
            inputType={"password"}
            label={"Password confirmation"}
            placeholder={"Password confirmation"}
            fullWidth={true}
            errorText={
              errors.confirmationPassword ? "The passwords must match" : ""
            }
            {...register("confirmationPassword")}
          />
          <span className={s.underTitle}>
            Your password must be between 6 and 20 characters
          </span>
          <Button className={s.button} variant={"primary"}>
            Create new password
          </Button>
        </form>
      </div>
    </Card>
  );
};
