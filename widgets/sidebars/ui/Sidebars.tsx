'use client';
import React, { useState } from 'react';
import { Button } from '@irondragons/ui-lib-inctagram';
import { AuthModal } from '@/shared/authModal/ui/AuthModal';
import { useLogoutMutation } from '@/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import s from './sidebars.module.scss';

export const Sidebars = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoutHandler] = useLogoutMutation();
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const router = useRouter();
  
  const handleLogout = () => {
    logoutHandler('').unwrap().then(() => {
      router.push('/sign-in');
    });
  };
  
  return (
    <>
      <div>
        <Button className={s.logoutButton}
          variant={'text_button'}
          onClick={openModal}
        >
          Log out
        </Button>
        <AuthModal
          title={'Log out'}
          description={'Are you really want to log out of your account'}
          openModal={closeModal}
          isModalOpen={isModalOpen}>
          <>
            <Button onClick={handleLogout}>Yes</Button>
            <Button className={s.modalButton} onClick={closeModal}>No</Button>
          </>
        </AuthModal>
      </div>
    </>
  );
};