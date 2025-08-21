'use client'

import { NewPublication } from '@/entities/newPublication'
import { useLogoutMutation } from '@/features/auth/api/authApi'
import { PATH } from '@/shared/constants/path'
import { TextModal } from '@/shared/modals/textModal'
import { MenuItem } from '@/widgets/sidebar/ui/MenuItem'
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import s from './sidebar.module.scss'

export const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNewPublicationOpen, setIsNewPublicationOpen] = useState(false)
  const [logoutHandler] = useLogoutMutation()

  const menuItems = [
    {
      text: 'Feed',
      icon: <UniversalIcon name={'home-outline'} />,
      href: PATH.profile,
    },
    {
      text: 'Create',
      icon: <UniversalIcon name={'plus-square-outline'} />,
      onClick: () => {
        setIsNewPublicationOpen(true)
      },
    },
    {
      text: 'My Profile',
      icon: <UniversalIcon name={'person-outline'} />,
      href: PATH.user_profile,
    },
    {
      text: 'Messenger',
      icon: <UniversalIcon name={'message-circle-outline'} />,
      href: PATH.profile,
    },
    {
      text: 'Search',
      icon: <UniversalIcon name={'search'} />,
      href: PATH.profile,
    },
    {
      text: 'Statistics',
      icon: <UniversalIcon name={'trending-up-outline'} />,
      href: PATH.profile,
    },
    {
      text: 'Favorites',
      icon: <UniversalIcon name={'bookmark-outline'} />,
      href: PATH.profile,
    },
  ]

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleLogout = async () => {
    try {
      await logoutHandler('').unwrap()
      router.push(PATH.sign_in)
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const handleMenuClick = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className={s.sidebar}>
      <ul className={s.sidebar_menu}>
        {menuItems.map((menuItem, index) => (
          <MenuItem
            key={index}
            {...menuItem}
            isActive={activeIndex === index}
            onClick={() => {
              handleMenuClick(index)
              menuItem.onClick?.()
            }}
          />
        ))}
      </ul>
      <ul className={s.footer}>
        <Button className={s.logoutButton} variant={'text_button'} onClick={openModal}>
          <UniversalIcon className={s.icon} name={'log-out'} />
          Log out
        </Button>
        <TextModal
          title={'Log out'}
          description={'Are you really want to log out of your account'}
          openModal={closeModal}
          isModalOpen={isModalOpen}
        >
          <>
            <Button onClick={handleLogout} variant="outline">
              Yes
            </Button>
            <Button className={s.modalButton} onClick={closeModal}>
              No
            </Button>
          </>
        </TextModal>
      </ul>

      {isNewPublicationOpen && <NewPublication onClose={() => setIsNewPublicationOpen(false)} />}
    </div>
  )
}
