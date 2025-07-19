"use client";

import {
  InputsForm,
  signInSchema,
} from "@/features/auth/signIn/lib/schemas/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Input,
  UniversalIcon,
} from "@irondragons/ui-lib-inctagram";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./signIn.module.scss";

type Props = {};

export const SignIn = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsForm>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<InputsForm> = (data) => {
    console.log(data);
  };

  return (
      <Card>
        <div className={s.formWrapper}>
          <h2 className={s.title}>Sign In</h2>
          <div className={s.oAuth}>
          <Link href={"google.com"}>
            <UniversalIcon
              name={"google"}
              dataStatic={true}
              width={"36px"}
              height={"36px"}
            /></Link>
            <Link href={"github.com"}>
              <UniversalIcon name={"github"} width={"36px"} height={"36px"} />
            </Link>
            </div>

          <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div className={s.fieldsWrapper}>
            <Input
              label={"Email"}
              id={"email"}
              placeholder={"Epam@epam.com"}
              inputType={"email"}
              errorText={errors.email?.message}
              {...register("email")}
            />

            <div className={s.passwordField}>
              <Input
                label={"Password"}
                id={"password"}
                placeholder={"••••••••••••••"}
                inputType={"password"}
                errorText={errors.password?.message}
                {...register("password")}
              />
            </div>
            </div>
            <div className={s.links}>
              <Link className={s.forgotLink} href="/forgot-password" >
                Forgot Password
              </Link>
            </div>

            <Button variant="primary" fullWidth className={s.signInBtn}>
              Sign In
            </Button>
          </form>
          <div className={s.bottomText}>
            <p>Don’t have an account?</p>
            
            <Link className={s.signUpLink} href="/sign-up" >
              Sign Up
            </Link>
            </div>
        </div>
        
      </Card>
  );
};
