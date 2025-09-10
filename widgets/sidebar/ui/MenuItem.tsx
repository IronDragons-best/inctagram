import { ReactNode } from 'react'
import Link from 'next/link'
import s from './sidebar.module.scss'

type MenuItemProps = {
  text: string
  href?: string
  icon: ReactNode
  isActive: boolean
  onClick?: () => void
}

export const MenuItem = ({ href, icon, text, isActive, onClick }: MenuItemProps) => {
  const className = `${s.menu_item} ${isActive ? s.active : ''}`

  return (
    <li className={className}>
      {href ? (
        <Link className={s.menuButton} href={href} onClick={onClick}>
          <span className={s.icon}>{icon}</span>
          <span className={s.label}>{text}</span>
        </Link>
      ) : (
        <div>
          <button className={s.menuButtonCreate} onClick={onClick}>
            <span className={s.icon}>{icon}</span>
            <span className={s.label}>{text}</span>
          </button>
        </div>
      )}
    </li>
  )
}
