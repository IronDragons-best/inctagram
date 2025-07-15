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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Inputs,
  signUpSchema,
} from "@/features/auth/signUp/lib/schemas/signUp";

type Props = {};

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
    control,
    clearErrors,
    reset,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm<Inputs>({
    defaultValues: { conditions: false },
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  // Наблюдает за состоянием поля conditions, оно нужно, чтобы активировать кнопку отправки формы
  const agree = watch("conditions");

  // Проверяет валидны ли поля формы и заполнены ли они
  const isSubmitDisabled = !isDirty || !isValid;

  // При сабмите формы данные будут улетать на сервер
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, agree);
    reset();
  };

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
              errorText={errors.userName?.message}
              placeholder={"Enter your name"}
              required
              {...register("userName", {
                onChange: () => clearErrors("userName"),
              })}
            />
            <Input
              required
              label={"Email"}
              errorText={errors.email?.message}
              placeholder={"example@example.com"}
              id={"email"}
              inputType={"email"}
              {...register("email", {
                onChange: () => clearErrors("email"),
              })}
            />
            <Input
              required
              errorText={errors.password?.message}
              id={"password"}
              placeholder={"••••••••••••••"}
              label={"Password"}
              inputType={"password"}
              {...register("password", {
                onChange: () => clearErrors("password"),
              })}
            />
            <Input
              required
              id={"confirmationPassword"}
              errorText={errors.confirmationPassword?.message}
              placeholder={"••••••••••••••"}
              label={"Password confirmation"}
              inputType={"password"}
              {...register("confirmationPassword", {
                onChange: () => clearErrors("confirmationPassword"),
              })}
            />
          </div>

          <div className={s.actionsWrapper}>
            <Controller
              name="conditions"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, ...rest } }) => (
                <Checkbox
                  idProp={"sign-up-1"}
                  checked={value}
                  onCheckedChange={onChange}
                  label={Label}
                />
              )}
            />

            <Button
              variant={"primary"}
              disabled={isSubmitDisabled || !agree}
              fullWidth={true}
            >
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
