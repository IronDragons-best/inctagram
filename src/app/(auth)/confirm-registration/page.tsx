'use client';

import s from '@/src/app/(auth)/confirm-registration/congratulations.module.scss';
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram';
import { EmailConfirmationPage } from 'features/auth/ui/emailConfirmationPage';
import { redirect, useParams, useSearchParams } from 'next/navigation';
import { useConfirmEmailMutation } from '@/features/auth/api/authApi';
import { useEffect } from 'react';

const Page = () => {
  const [confirmEmailHandler] = useConfirmEmailMutation();
  const queryParams = useSearchParams();
  const confirmationCode = queryParams.get('code');
  
  // TODO: при разбиении кода, на бэке, сделать обработчик ошибок и редирект
  
  useEffect(() => {
    confirmEmailHandler(confirmationCode!).unwrap().then(res => {
      const errorMessage = res.error?.errorsMessages[0]?.message
      if(errorMessage === 'Confirmation code is expired' || errorMessage === 'Invalid confirmation code') {
        redirect('/expired-link')
      } else if (errorMessage === 'Email is already confirmed') {
        redirect('/sign-in')
      } else if (errorMessage === 'Invalid confirmation code') {
        redirect('/sign-up')
      }
    });
  }, []);
  
  return (
    <EmailConfirmationPage
      title="Congratulations!"
      description="Your email has been confirmed"
    >
      <>
        <div className={s.wrapper}>
          <Button variant={'primary'} onClick={() => redirect('/sign-in')}>
            Sign In
          </Button>
        </div>
        <div className={s.iconWrapper}>
          <UniversalIcon name={'Congratulations'} dataStatic={true} />
        </div>
      </>
    </EmailConfirmationPage>
  );
};

export default Page;
