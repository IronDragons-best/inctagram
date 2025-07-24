import { UniversalIcon } from '@irondragons/ui-lib-inctagram';
import { ElementType } from 'react';
import { MenuItem } from './MenuItem';
import s from './sidebar.module.scss';

// ПОКА НЕТ РОУТОВ БУДЕТ ПЕРЕЗАГРУЖАТЬ СТРАНИЦУ!!!!!!!!
// ПОКА НЕТ РОУТОВ БУДЕТ ПЕРЕЗАГРУЖАТЬ СТРАНИЦУ!!!!!!!!
// ПОКА НЕТ РОУТОВ БУДЕТ ПЕРЕЗАГРУЖАТЬ СТРАНИЦУ!!!!!!!!
export const Path = {
  Feed: '/feed',
  Create: '/create',
  Profile: '/profile',
  Messenger: '/messenger',
  Search: '/search',
  Stats: '/stats',
  Favorites: '/favorites',
  Logout: '/',
} as const;

export const PATH = {
  home: '/',
  profile: '/profile',
  user_profile: '/profile/:userid',
  confirm_registration: '/confirm-registration',
  create_new_password: '/create-new-password',
  expired_link: '/expired-link',
  forgot_password: '/forgot-password',
  password_recovery: '/password-recovery',
  sign_in: '/sign-in',
  sign_up: '/sign-up',
  privacy_policy: '/privacy-policy',
  terms_of_service: '/terms-of-service',
  settings: '/settings',
  public_authorize_user: '/public-authorized-user',
};


const menuItems = [
  { text: 'Feed', icon: <UniversalIcon name={'home-outline'} />, href: Path.Feed },
  { text: 'Create', icon: <UniversalIcon name={'plus-square-outline'} />, href: Path.Create },
  { text: 'My Profile', icon: <UniversalIcon name={'person-outline'} />, href: Path.Profile },
  { text: 'Messenger', icon: <UniversalIcon name={'message-circle-outline'} />, href: Path.Messenger },
  { text: 'Search', icon: <UniversalIcon name={'search'} />, href: Path.Search },
  { text: 'Statistics', icon: <UniversalIcon name={'trending-up-outline'} />, href: Path.Stats },
  { text: 'Favorites', icon: <UniversalIcon name={'bookmark-outline'} />, href: Path.Favorites },
];
const menuFooter = { text: 'Log out', icon: <UniversalIcon name={'log-out'} />, href: Path.Logout };

export const Sidebar = () => {
  return (
    <nav className={s.sidebar}>
      <ul className={s.sidebar_menu}>
        {menuItems.map((menuItem, index) => (
          <MenuItem key={index} {...menuItem} />
        ))}
      </ul>
      <ul className={s.footer}>
        <MenuItem  {...menuFooter} />
      </ul>
    </nav>
  );
};
