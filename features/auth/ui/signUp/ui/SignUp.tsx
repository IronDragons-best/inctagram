'use client';

import s from './signUp.module.scss';
import {
  Button,
  Card,
  Checkbox,
  Input,
  UniversalIcon,
} from '@irondragons/ui-lib-inctagram';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as React from 'react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Inputs,
  signUpSchema,
} from '@/features/auth/ui/signUp/lib/schemas/signUp';
import { AuthModal } from '@/shared/authModal/ui/AuthModal';
import { useRegistrationMutation } from '@/features/auth/api/authApi';

const Label = (
  <span className={s.conditions}>
    I agree to the&nbsp;
    <Link href="/terms-of-service" className="small-link">
      Terms of Service
    </Link>
    &nbsp;and&nbsp;
    <Link href="/privacy-policy" className="small-link">
      Privacy Policy
    </Link>
  </span>
);

export const SignUp = () => {
  const [openModal, setOpenModal] = useState(false);
  const [errorUsernameExist, setErrorUsernameExist] = useState('');
  const [errorEmailExist, setErrorEmailExist] = useState('');
  const [registrationHandler] = useRegistrationMutation();
  
  const resetFormFields = () => {
    setOpenModal(false);
    reset();
  };
  
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    reset,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm<Inputs>({
    defaultValues: { agreeToTerms: false },
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });
  
  // Наблюдает за состоянием поля agreeToTerms, оно нужно, чтобы активировать кнопку отправки формы
  const agree = watch('agreeToTerms');
  const email = watch('email');
  
  // Проверяет валидны ли поля формы и заполнены ли они
  const isSubmitDisabled = !isDirty || !isValid;
  
  // При сабмите формы данные будут улетать на сервер
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    registrationHandler(data).unwrap().then((res) => {
      const errorField = res.error?.errorsMessages[0]?.field;
      if (errorField === 'username') {
        setErrorUsernameExist('User with this username is already registered');
      } else if (errorField === 'email') {
        setErrorEmailExist('User with this email is already registered');
      } else {
        setOpenModal(true);
      }
    });
  };
  
  // TODO: Не забыть поменять ссылки на актуальные, после правок добавить чилдами ссылки на страницы terms и policy
  // TODO: Разбить компоненту на более мелкие куски
  return (
    <Card>
      <div className={s.formWrapper}>
        <h2 className={s.formTitle}>Sign Up</h2>
        
        <div className={s.oAuthWrapper}>
          {/* пока что вместо ссылок заглушки */}
          <Link href={'google.com'}>
            <UniversalIcon
              name={'google'}
              dataStatic={true}
              width={'36px'}
              height={'36px'}
            />
          </Link>
          <Link href={'google.com'}>
            <UniversalIcon name={'github'} width={'36px'} height={'36px'} />
          </Link>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.fieldsWrapper}>
            <Input
              fullWidth={true}
              inputType={'text'}
              label={'Username'}
              id={'username'}
              errorText={errors.username?.message || errorUsernameExist}
              placeholder={'Enter your name'}
              required
              {...register('username', {
                onChange: () => {
                  clearErrors('username');
                  setErrorUsernameExist('');
                },
              })}
            />
            <Input
              fullWidth={true}
              required
              label={'Email'}
              errorText={errors.email?.message || errorEmailExist}
              placeholder={'example@example.com'}
              id={'email'}
              inputType={'email'}
              {...register('email', {
                onChange: () => {
                  clearErrors('email');
                  setErrorEmailExist('');
                },
              })}
            />
            <Input
              fullWidth={true}
              required
              errorText={errors.password?.message}
              id={'password'}
              placeholder={'••••••••••••••'}
              label={'Password'}
              inputType={'password'}
              {...register('password', {
                onChange: () => clearErrors('password'),
              })}
            />
            <Input
              fullWidth={true}
              required
              id={'passwordConfirmation'}
              errorText={errors.passwordConfirmation?.message}
              placeholder={'••••••••••••••'}
              label={'Password confirmation'}
              inputType={'password'}
              {...register('passwordConfirmation', {
                onChange: () => clearErrors('passwordConfirmation'),
              })}
            />
          </div>
          
          <div className={s.actionsWrapper}>
            <Controller
              name="agreeToTerms"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, ...rest } }) => (
                <Checkbox
                  idProp={'sign-up-1'}
                  checked={value}
                  onCheckedChange={onChange}
                  label={Label}
                />
              )}
            />
            
            <Button
              variant={'primary'}
              disabled={isSubmitDisabled || !agree}
              fullWidth={true}
            >
              Sign Up
            </Button>
          </div>
          
          <div className={s.switchToSignIn}>
            <p>Do you have an account?</p>
            
            <Link href={'/sign-in'}>Sign In</Link>
          </div>
        </form>
      </div>
      <AuthModal
        title={'Email sent'}
        description={`We have sent a link to confirm your email to ${email}`}
        openModal={resetFormFields}
        isModalOpen={openModal}
      >
        <Button variant={'primary'}>OK</Button>
      </AuthModal>
    </Card>
  );
};
