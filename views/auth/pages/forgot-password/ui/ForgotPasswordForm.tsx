'use client';

import { RECAPTCHA_SITE_KEY } from '@/shared/config/recaptcha';
import { Button, Card, Input } from '@irondragons/ui-lib-inctagram';
import * as React from 'react';
import { useState } from 'react';
import s from './ForgotPasswordForm.module.scss';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReCAPTCHA from 'react-google-recaptcha';
import { useReCaptchaMutation } from '@/features/auth/api/authApi';
import { forgotPasswordFormSchema, InputForm } from '@/views/auth/pages/forgot-password/lib/schemas/forgotPasswordForm';
export const ForgotPasswordForm = () => {
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [reCaptchaMut] = useReCaptchaMutation();
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<InputForm>({
    resolver: zodResolver(forgotPasswordFormSchema),
    mode: 'onChange',
  });
  
  const onSubmit: SubmitHandler<InputForm> = async (data) => {
    console.log(data);
    reCaptchaMut(data).unwrap().then(
      (res) => {
        return res
      },
    );
    
    setIsLinkSent(true);
    reset();
  };
  
  return (
    <Card>
      <form className={s.forgotPassForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.forgotPassForm__container}>
          <h1 className={s.forgotPassForm__title}>Forgot Password</h1>
          <Input
            id={'email'}
            inputType={'email'}
            label={'Email'}
            placeholder="Epam@epam.com"
            fullWidth={true}
            errorText={errors.email?.message}
            required
            {...register('email')}
          />
          <p className={s.forgotPassForm__descr}>
            Enter your email address and we will send you further instructions{' '}
          </p>
          {isLinkSent && (
            <div className={s.forgotPassForm__info}>
              <p>The link has been sent by email.</p>
              <p>If you don’t receive an email send link again</p>
            </div>
          )}
          <Button
            className={s.forgotPassForm__sendLink}
            fullWidth={true}
            type="submit"
            disabled={!isDirty || !isValid}
          >
            {isLinkSent ? 'Send Link Again' : 'Send Link'}
          </Button>
          <Link href={'/public'} className={s.forgotPassForm__backSignIn}>
            Back to Sign In
          </Link>
          <Controller
            name="captchaToken"
            control={control}
            rules={{ required: true }}
            render={({ field: {onChange} }) => (
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={onChange}
                theme={'dark'}
              ></ReCAPTCHA>
            )}
          />
        </div>
      </form>
    </Card>
  );
};
