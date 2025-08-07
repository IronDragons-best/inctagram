import React, { ReactNode } from 'react'
import { Dialog } from 'radix-ui'
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import styles from '@/shared/addPhotoModal/ui/addPhotoModal.module.scss'

type AddPhotoModalProps = {
  onOpenChange: (open: boolean) => void
  isModalOpen: boolean
  title: string
  children: ReactNode
}

export const AddPhotoModal = ({
  onOpenChange,
  isModalOpen,
  title,
  children,
}: AddPhotoModalProps) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <div className={styles.Heading}>
            <Dialog.Title className={styles.Title}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <Button className={styles.IconButton} aria-label="Close" tabIndex={-1}>
                <UniversalIcon name={'close'} />
              </Button>
            </Dialog.Close>
          </div>

          <div className={styles.bodyContent}>
            <div className={styles.imageBox}>
              <UniversalIcon name={'image-outline'} />
            </div>
            <div className={styles.Children}>{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
