import s from '@/shared/modals/addPhotoModal/ui/photoModal.module.scss'
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { Dialog } from 'radix-ui'
import React, { ReactNode } from 'react'

type AddPhotoModalProps = {
  onOpenChange?: (open: boolean) => void
  isModalOpen: boolean
  title: string
  children: ReactNode
  fileInputRef?: React.RefObject<HTMLInputElement | null>
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isImage: boolean
}

export const PhotoModal = ({
  onOpenChange,
  isModalOpen,
  title,
  children,
  fileInputRef,
  onFileChange,
  isImage,
}: AddPhotoModalProps) => {
  const handleSelectClick = () => {
    fileInputRef?.current?.click()
  }

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isModalOpen}>
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

          <div className={s.bodyContent}>
            {isImage && (
              <div className={s.imageBox} onClick={handleSelectClick}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={onFileChange}
                />
                <UniversalIcon name={'image-outline'} />
              </div>
            )}
            <div className={s.children}>{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
