'use client';
import { useLogoutMutation } from '@/features/auth/api/authApi';
import { AuthModal } from '@/shared/authModal/ui/AuthModal';
import { PATH } from '@/shared/constants/path';
import { MenuItem } from '@/widgets/sidebars/ui/MenuItem';
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import s from './sidebars.module.scss';

export const Sidebars = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoutHandler] = useLogoutMutation();
  
  
  const menuItems = [
    { text: 'Feed', icon: <UniversalIcon name={'home-outline'} />, href: PATH.profile },
    { text: 'Create', icon: <UniversalIcon name={'plus-square-outline'} />, href: PATH.profile  },
    { text: 'My Profile', icon: <UniversalIcon name={'person-outline'} />, href: PATH.profile  },
    { text: 'Messenger', icon: <UniversalIcon name={'message-circle-outline'} />, href: PATH.profile  },
    { text: 'Search', icon: <UniversalIcon name={'search'} />, href: PATH.profile  },
    { text: 'Statistics', icon: <UniversalIcon name={'trending-up-outline'} />, href: PATH.profile  },
    { text: 'Favorites', icon: <UniversalIcon name={'bookmark-outline'} />, href: PATH.profile  },
  ];
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);; 
  const handleLogout = () => {
    logoutHandler('')
      .unwrap()
      .then(() => {
        localStorage.removeItem('accessToken');
        router.push('/sign-in');
      });
  };
  const handleMenuClick = (index: number) => {
    setActiveIndex(index); 
  };
  
  return (
    <div className={s.sidebar}>
      <ul className={s.sidebar_menu}>
        {menuItems.map((menuItem, index) => (
          <MenuItem key={index} {...menuItem}  
          isActive={activeIndex === index} 
          onClick={() => handleMenuClick(index)}
          />
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
