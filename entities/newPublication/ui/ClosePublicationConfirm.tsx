'use client'

import { TextModal } from '@/shared/modals/textModal'
import { Button } from '@irondragons/ui-lib-inctagram'
import s from '@/widgets/sidebar/ui/sidebar.module.scss'
import React from 'react'

type ClosePublicationConfirmProps = {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ClosePublicationConfirm = ({
  isOpen,
  onConfirm,
  onCancel,
}: ClosePublicationConfirmProps) => {
  return (
    <div>
      <TextModal
        title={'Close'}
        description={
          'Are you sure you want to close your new publication? All changes will be lost.'
        }
        openModalType={onCancel}
        isModalOpen={isOpen}
      >
        <>
          <Button variant={'outline'} onClick={onConfirm}>
            Yes
          </Button>
          <Button variant={'primary'} className={s.modalButton} onClick={onCancel}>
            No
          </Button>
        </>
      </TextModal>
    </div>
  )
}
