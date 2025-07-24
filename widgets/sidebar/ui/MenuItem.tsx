import { ElementType, ReactNode } from 'react';
import s from './sidebar.module.scss';

type MenuItemProps<T extends ElementType = 'a'> = {
  as?: T;
  text?: string;
  href?: string;
  icon?: ReactNode;
};

export const MenuItem = <T extends ElementType = 'a'>({
  as,
  href,
  icon,
  text,
}: MenuItemProps<T>) => {
  const Component = as || 'a';
  return (
    <li className={s.menu_item}>
      <Component className={s.menuButton} href={href}>
        <span className={s.icon}>{icon}</span>
        <span className={s.label}>{text}</span>
      </Component>
    </li>
  );
};
