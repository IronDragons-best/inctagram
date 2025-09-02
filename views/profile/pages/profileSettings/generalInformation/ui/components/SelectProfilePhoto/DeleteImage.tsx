'use client'

import React from 'react'
import { TextModal } from '@/shared/modals/textModal'
import { Button } from '@irondragons/ui-lib-inctagram'
import { useRemoveAvatarProfileMutation } from '@/shared/schemas/api/profileApi'
import s from '@/widgets/sidebar/ui/sidebar.module.scss'
import { useParams } from 'next/navigation'

type DeleteImageProps = {
  setFinalImage: (img: string | null) => void
  isOpen: boolean
  onClose: () => void
  openModalType: (open: boolean) => void
}

export const DeleteImage = ({
  setFinalImage,
  isOpen,
  onClose,
  openModalType,
}: DeleteImageProps) => {
  const [removeAvatar] = useRemoveAvatarProfileMutation()
  const { userId } = useParams<{ userId: string }>()

  const handelDelete = async () => {
    await removeAvatar({ userId: Number(userId) })
    setFinalImage(null)
    onClose()
  }

  return (
    <div>
      <TextModal
        title={'Delete Photo'}
        description={'Do you really want to delete your profile photo?'}
        openModalType={openModalType}
        isModalOpen={isOpen}
      >
        <div>
          <Button variant={'outline'} onClick={handelDelete}>
            Yes
          </Button>
          <Button variant={'primary'} className={s.modalButton} onClick={onClose}>
            No
          </Button>
        </div>
      </TextModal>
    </div>
  )
}
