import Link from 'next/link';
import { ReactNode } from 'react';
import s from './sidebars.module.scss';

type MenuItemProps = {
  text: string;
  href: string;
  icon: ReactNode;
  isActive: boolean; 
  onClick: () => void; 
};

export const MenuItem =({
  href,
  icon,
  text,
  isActive,
  onClick,
}: MenuItemProps) => {
  return (
    <li className={`${s.menu_item} ${isActive ? s.active : ''}`} onClick={onClick}>
      <Link className={s.menuButton} href={href}>
        <span className={s.icon}>{icon}</span>
        <span className={s.label}>{text}</span>
      </Link>
    </li>
  );
};
