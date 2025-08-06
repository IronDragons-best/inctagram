'use client';

import { Button, Card, Input } from '@irondragons/ui-lib-inctagram';
import s from './createNewPassword.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import {
  PasswordRecoveryFormType,
  passwordRecoveryValidation,
} from '@/views/auth/pages/create-new-password/lib/schemas/passwordConfirmation';

export const CreateNewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormType>({
    resolver: zodResolver(passwordRecoveryValidation),
    mode: 'onBlur',
  });
  const onSubmitHandler: SubmitHandler<PasswordRecoveryFormType> = (data) =>
    console.log(data);
  
  return (
    <Card>
      <div className={s.formWrapper}>
        <h2 className={s.formTitle}>Create New Password</h2>
        
        <form onSubmit={handleSubmit(onSubmitHandler)} className={s.form}>
          <Input
            id={'newPassword'}
            inputType={'password'}
            label={'New password'}
            placeholder={'New password'}
            errorText={
              errors.password?.message
            }
            fullWidth
            {...register('password')}
          />
          <Input
            id={'passwordConfirmation'}
            inputType={'password'}
            label={'Password confirmation'}
            placeholder={'Password confirmation'}
            fullWidth
            errorText={
              errors.passwordConfirmation?.message
            }
            {...register('passwordConfirmation')}
          />
          <span className={s.underTitle}>
            Your password must be between 6 and 20 characters
          </span>
          <Button className={s.button} variant={'primary'}>
            Create new password
          </Button>
        </form>
      </div>
    </Card>
  );
};
