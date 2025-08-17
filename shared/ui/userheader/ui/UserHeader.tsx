'use client'

import { UniversalIcon } from '@irondragons/ui-lib-inctagram'
import s from './userHeader.module.scss'
import Image from 'next/image'
import photo2 from '@/public/assets/img/photo_02.png'
import { Dropdown } from '@/shared/ui/dropdown'
import * as React from 'react'
import { useState } from 'react'
import { useTimeAgo } from '@/shared/hooks/userTimeAgo'

const MOCK_DATA = [
  {
    icon: 'edit-2-outline',
    label: 'Edit Post',
    onClick: () => {},
  },
  {
    icon: 'trash-outline',
    label: 'Delete Post',
    onClick: () => {},
  },
]

type Props = {
  isUserTime?: boolean
  userTime?: Date
  children?: React.ReactNode
}

export const UserHeader = ({ isUserTime, userTime }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const timeAgo = useTimeAgo(userTime)

  return (
    <div className={s.PostTitle}>
      <div className={s.UserAvatar}>
        <Image src={photo2} alt={'photo beach'} />
      </div>
      <div className={s.UsernameContainer}>
        <span className={s.Username}>UserName</span>
        {isUserTime && <div className={s.UserTime}>{timeAgo}</div>}
      </div>
      <div className={s.MoreIcon} onClick={() => setDropdownOpen(true)}>
        <UniversalIcon name={'more-horizontal-outline'} />
        <Dropdown
          onClose={() => setDropdownOpen(false)}
          isModalOpen={dropdownOpen}
          items={MOCK_DATA}
        />
      </div>
    </div>
  )
}
