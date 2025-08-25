'use client'

import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { Dialog } from 'radix-ui'
import { ReactNode } from 'react'
import s from './textModal.module.scss'

type Props = {
  title: string
  description: string
  openModal?: () => void
  openModalType?: (open: boolean) => void
  isModalOpen: boolean
  children: ReactNode
}

export const TextModal = ({
  openModal,
  openModalType,
  isModalOpen,
  description,
  title,
  children,
}: Props) => {
  const handleOpenModal = (open: boolean) => {
    if (openModalType) {
      openModalType(open) // вариант с boolean
    }
    if (openModal) {
      openModal() // вариант без аргументов
    }
  }

  return (
    <Dialog.Root onOpenChange={handleOpenModal} open={isModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <div className={s.heading}>
            <Dialog.Title className={s.title}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <Button className={s.iconButton} aria-label="Close" tabIndex={-1}>
                <UniversalIcon name={'close'} />
              </Button>
            </Dialog.Close>
          </div>

          <Dialog.Description className={s.description}>{description}</Dialog.Description>

          <div className={s.children}>
            <Dialog.Close asChild>{children}</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
