"use client";

import styles from "./signUp.module.scss";
import {
  Button,
  Card,
  Checkbox,
  Input,
  UniversalIcon,
} from "@irondragons/ui-lib-inctagram";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {};

type Inputs = {
  userName: string;
  email: string;
  password: string;
  confirmationPassword: string;
};

export const SignUp = ({}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const TERMS_OF_SERVICE_LINK = () => (
    <Button as="a" href="/">
      Terms of Service
    </Button>
  );
  // TODO: Не забыть поменять ссылки на актуальные, после правок добавить чилдами ссылки на страницы terms и policy
  // TODO: Реализовать zod валидацию
  return (
    <Card>
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Sign Up</h2>
        <div className={styles.oAuthWrapper}>
          {/* пока что вместо ссылок заглушки */}
          <Link href={"google.com"}>
            <UniversalIcon name={"google"} dataStatic={true} height={'36px'} width={'36px'}/>
          </Link>
          <Link href={"google.com"}>
            <UniversalIcon name={"github"} dataStatic={false} height={'36px'} width={'36px'}/>
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            inputType={"text"}
            label={"Username"}
            required
            {...register("userName")}
          />
          <Input
            required
            label={"Email"}
            inputType={"email"}
            {...register("email")}
          />
          <Input
            required
            label={"Password"}
            inputType={"password"}
            {...register("password")}
          />
          <Input
            required
            label={"Password confirmation"}
            inputType={"password"}
            {...register("confirmationPassword")}
          />
          {/* There should be password confirmation text */}
          {errors.confirmationPassword && <span>Password aren't equal</span>}

          <Checkbox idProp={"sign-up-1"} label={`I agree to the ....`} />

          <Button variant={"primary"} fullWidth={true}>
            Sign up
          </Button>

          <p>Do you have an account?</p>

          <Button as={"a"} href={"/"} variant={"text_button"}>
            Sign In
          </Button>
        </form>
      </div>
    </Card>
  );
};
