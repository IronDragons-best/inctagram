'use client'

import React from 'react'
import { TextModal } from '@/shared/modals/textModal'
import { Button } from '@irondragons/ui-lib-inctagram'
import s from '@/widgets/sidebar/ui/sidebar.module.scss'

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
  const handelDelete = () => {
    setFinalImage(null)
    onClose()
  }

  return (
    <div>
      <TextModal
        title={'Delete Photo'}
        description={'Are you really want to log out of your account'}
        openModalType={openModalType}
        isModalOpen={isOpen}
      >
        <>
          <Button variant={'outline'} onClick={handelDelete}>
            Yes
          </Button>
          <Button variant={'primary'} className={s.modalButton} onClick={onClose}>
            No
          </Button>
        </>
      </TextModal>
    </div>
  )
}
