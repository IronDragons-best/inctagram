'use client'

import { NewPublication } from '@/entities/newPublication'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api/authApi'
import { PATH } from '@/shared/constants/path'
import { TextModal } from '@/shared/modals/textModal'
import { MenuItem } from '@/widgets/sidebar/ui/MenuItem'
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import s from './sidebar.module.scss'
import { extractUserEmail } from '@/shared/utils/typeGuards'

type SidebarItemBase = { text: string; iconName: string }
type SidebarItemLink = SidebarItemBase & { href: string; onClick?: never }
type SidebarItemAction = SidebarItemBase & { onClick: () => void; href?: never }
type SidebarItemConfig = SidebarItemLink | SidebarItemAction

export const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNewPublicationOpen, setIsNewPublicationOpen] = useState(false)
  const [logoutHandler] = useLogoutMutation()
  const { data } = useMeQuery({})
  const email = extractUserEmail(data)

  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

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

  const openNewPublication = useCallback(() => {
    setIsNewPublicationOpen(true)
  }, [])

  const menuItems: SidebarItemConfig[] = useMemo(
    () => [
      { text: 'Feed', iconName: 'home-outline', href: PATH.profile },
      { text: 'Create', iconName: 'plus-square-outline', onClick: openNewPublication },
      { text: 'My Profile', iconName: 'person-outline', href: PATH.user_profile },
      { text: 'Messenger', iconName: 'message-circle-outline', href: PATH.profile },
      { text: 'Search', iconName: 'search', href: PATH.profile },
      { text: 'Statistics', iconName: 'trending-up-outline', href: PATH.profile },
      { text: 'Favorites', iconName: 'bookmark-outline', href: PATH.profile },
    ],
    [openNewPublication]
  )

  const logoutDescription =
    'Are you really want to log out of your account' + (email ? ` ${email}` : '')

  return (
    <div className={s.sidebar}>
      <ul className={s.sidebar_menu}>
        {menuItems.map((item, index) => {
          const action = 'onClick' in item ? item.onClick : undefined

          const handleItemClick = () => {
            handleMenuClick(index)
            action?.()
          }

          return (
            <MenuItem
              key={item.text}
              text={item.text}
              icon={<UniversalIcon name={item.iconName} />}
              href={'href' in item ? item.href : undefined}
              isActive={activeIndex === index}
              onClick={handleItemClick}
            />
          )
        })}
      </ul>
      <ul className={s.footer}>
        <Button className={s.logoutButton} variant={'text_button'} onClick={openModal}>
          <UniversalIcon className={s.icon} name={'log-out'} />
          Log out
        </Button>
        <TextModal
          title={'Log out'}
          description={logoutDescription}
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
