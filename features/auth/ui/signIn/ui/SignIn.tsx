"use client";

import { useSignInMutation } from "@/features/auth/api/authApi";
import {
  InputsForm,
  signInSchema,
} from "@/features/auth/ui/signIn/lib/schemas/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Input,
  UniversalIcon,
} from "@irondragons/ui-lib-inctagram";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./signIn.module.scss";

type Props = {};

export const SignIn = ({}: Props) => {
  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<InputsForm>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });
  const [signInHandler] = useSignInMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    try {
      const response = await signInHandler(data).unwrap();
      const accessToken = response?.accessToken;
      if (!accessToken) {
        throw new Error("Token not received");
      }
      localStorage.setItem("accessToken", accessToken);
      router.push("/profile");
    } catch (error) {
      console.error("Login error:", error);
    }
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
            />
          </Link>
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
              fullWidth={true}
              {...register("email", {
                onChange: () => clearErrors("email"),
              })}
            />

            <Input
              label={"Password"}
              id={"password"}
              placeholder={"••••••••••••••"}
              inputType={"password"}
              errorText={errors.password?.message}
              fullWidth={true}
              {...register("password", {
                onChange: () => clearErrors("password"),
              })}
            />
          </div>

          <div className={s.forgotLink}>
            <Link  href="/forgot-password">Forgot Password</Link>
          </div>

          <Button variant="primary" fullWidth={true} disabled={!isValid}>
            Sign In
          </Button>
          <div className={s.bottomText}>
            <div>
              <p>Don’t have an account?</p>
            </div>
            <div className={s.signUpLink}>
              <Link href="/sign-up">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};
