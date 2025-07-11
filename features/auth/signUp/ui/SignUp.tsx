"use client";

import s from "./signUp.module.scss";
import {
  Button,
  Card,
  Checkbox,
  Input,
  UniversalIcon,
} from "@irondragons/ui-lib-inctagram";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";
import { useState } from "react";

type Props = {};

type Inputs = {
  userName: string;
  email: string;
  password: string;
  confirmationPassword: string;
};

const Label = (
  <span className={s.conditions}>
    I agree to the&nbsp;
    <Link href="/terms" className="small-link">
      Terms of Service
    </Link>
    &nbsp;and&nbsp;
    <Link href="/privacy" className="small-link">
      Privacy Policy
    </Link>
  </span>
);

export const SignUp = ({}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // TODO: Не забыть поменять ссылки на актуальные, после правок добавить чилдами ссылки на страницы terms и policy
  // TODO: Реализовать zod валидацию
  return (
    <Card>
      <div className={s.formWrapper}>
        <h2 className={s.formTitle}>Sign Up</h2>
        <div className={s.oAuthWrapper}>
          {/* пока что вместо ссылок заглушки */}
          <Link href={"google.com"}>
            <UniversalIcon
              name={"google"}
              dataStatic={true}
              width={"36px"}
              height={"36px"}
            />
          </Link>
          <Link href={"google.com"}>
            <UniversalIcon name={"github"} width={"36px"} height={"36px"} />
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.fieldsWrapper}>
            <Input
              inputType={"text"}
              label={"Username"}
              id={"username"}
              placeholder={"Enter your name"}
              required
              {...register("userName")}
            />
            <Input
              required
              label={"Email"}
              placeholder={"example@example.com"}
              id={"email"}
              inputType={"email"}
              {...register("email")}
            />
            <Input
              required
              id={"password"}
              placeholder={"••••••••••••••"}
              label={"Password"}
              inputType={"password"}
              {...register("password")}
            />
            <Input
              required
              id={"confirmationPassword"}
              placeholder={"••••••••••••••"}
              label={"Password confirmation"}
              inputType={"password"}
              {...register("confirmationPassword")}
            />
            {/* There should be password confirmation text */}
            {errors.confirmationPassword && <span>Password aren't equal</span>}
          </div>

          <div className={s.actionsWrapper}>
            <Checkbox idProp={"sign-up-1"} label={Label} />

            <Button variant={"primary"} fullWidth={true}>
              Sign Up
            </Button>
          </div>

          <div className={s.switchToSignIn}>
            <p>Do you have an account?</p>

            <Link href={"/"}>Sign In</Link>
          </div>
        </form>
      </div>
    </Card>
  );
};
