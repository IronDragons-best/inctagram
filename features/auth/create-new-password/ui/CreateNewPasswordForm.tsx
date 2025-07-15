"use client";

import { Button, Card, Input } from '@irondragons/ui-lib-inctagram';

import s from "./createNewPassword.module.scss"
import Image from 'next/image';

export const CreateNewPasswordForm = () => {
  return (
    <Card>
      <div className={s.formWrapper}>
        
        <h2 className={s.formTitle}>Create New Password</h2>
        
        <form className={s.form}>
          <Input label={"New password"} inputType={'password'} fullWidth={true}/>
          <Input label={"Password confirmation"} inputType={'password'} fullWidth={true}/>
          <span className={s.underTitle}>Your password must be between 6 and 20 characters</span>
          <Button className={s.button} variant={"primary"}>Create new password</Button>
        </form>
      </div>
    </Card>
    )
}