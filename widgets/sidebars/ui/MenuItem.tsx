import { ReactNode } from 'react';
import s from './sidebars.module.scss'
import Link from 'next/link';

type MenuItemProps = {
  text: string;
  href: string;
  icon: ReactNode;
};

export const MenuItem =({
  href,
  icon,
  text,
}: MenuItemProps) => {
  return (
    <li className={s.menu_item}>
      <Link className={s.menuButton} href={href}>
        <span className={s.icon}>{icon}</span>
        <span className={s.label}>{text}</span>
      </Link>
    </li>
  );
};
