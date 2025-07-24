'use client';
import React, { useState } from 'react';
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram';
import { AuthModal } from '@/shared/authModal/ui/AuthModal';
import { useLogoutMutation } from '@/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import s from './sidebars.module.scss';
import { MenuItem } from '@/widgets/sidebars/ui/MenuItem';

export const Sidebars = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoutHandler] = useLogoutMutation();
  
  const Path = {
    Feed: '/feed',
    Create: '/create',
    Profile: '/profile',
    Messenger: '/messenger',
    Search: '/search',
    Stats: '/stats',
    Favorites: '/favorites',
    Logout: '/',
  } as const;
  
  const menuItems = [
    { text: 'Feed', icon: <UniversalIcon name={'home-outline'} />, href: Path.Feed },
    { text: 'Create', icon: <UniversalIcon name={'plus-square-outline'} />, href: Path.Create },
    { text: 'My Profile', icon: <UniversalIcon name={'person-outline'} />, href: Path.Profile },
    { text: 'Messenger', icon: <UniversalIcon name={'message-circle-outline'} />, href: Path.Messenger },
    { text: 'Search', icon: <UniversalIcon name={'search'} />, href: Path.Search },
    { text: 'Statistics', icon: <UniversalIcon name={'trending-up-outline'} />, href: Path.Stats },
    { text: 'Favorites', icon: <UniversalIcon name={'bookmark-outline'} />, href: Path.Favorites },
  ];
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const router = useRouter();
  
  const handleLogout = () => {
    logoutHandler('')
      .unwrap()
      .then(() => {
        localStorage.removeItem('accessToken');
        router.push('/sign-in');
      });
  };
  
  return (
    <div className={s.sidebar}>
      <ul className={s.sidebar_menu}>
        {menuItems.map((menuItem, index) => (
          <MenuItem key={index} {...menuItem} />
        ))}
      </ul>
      <ul className={s.footer}>
        <Button
          className={s.logoutButton}
          variant={'text_button'}
          onClick={openModal}
        >
          <UniversalIcon className={s.icon} name={'log-out'} />
          Log out
        </Button>
        <AuthModal
          title={'Log out'}
          description={'Are you really want to log out of your account'}
          openModal={closeModal}
          isModalOpen={isModalOpen}
        >
          <>
            <Button onClick={handleLogout}>Yes</Button>
            <Button className={s.modalButton} onClick={closeModal}>
              No
            </Button>
          </>
        </AuthModal>
      </ul>
    </div>
  );
};
