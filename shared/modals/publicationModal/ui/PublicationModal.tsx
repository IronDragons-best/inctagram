'use client'

import React, { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Dialog } from 'radix-ui'
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { Slider } from '@/shared/ui/slider'
import s from '@/shared/modals/publicationModal/ui/publicationModal.module.scss'

import clsx from 'clsx'

type PublicationModalProps = {
  openModal?: () => void
  isModalOpen: boolean
  title?: 'Edit Post' | 'Publication'
  children: ReactNode
  srcArray: string[]
  isSmall?: boolean
  onBack?: () => void
  onRequestClose?: () => void
  onPublish?: () => void
}

export const PublicationModal = ({
  openModal,
  isModalOpen,
  title,
  children,
  srcArray,
  isSmall = false,
  onBack,
  onRequestClose,
  onPublish,
}: PublicationModalProps) => {
  const isPublication = title === 'Publication'

  const router = useRouter()
  const pathname = usePathname()

  const handleOpenModal = (open: boolean) => {
    router.push(pathname)

    if (!open) {
      onRequestClose?.()
      return
    }

    openModal?.()
  }

  return (
    <Dialog.Root onOpenChange={handleOpenModal} open={isModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.Overlay} />
        <Dialog.Title className={s.MainTitle}>
          {/* TODO Что-то должно быть внутри для поисковых роботов */}
        </Dialog.Title>
        <Dialog.Content className={s.Content}>
          <Dialog.Close asChild>
            <Button
              variant={'text_button'}
              className={s.IconButton}
              aria-label="Close"
              tabIndex={-1}
            >
              <UniversalIcon name={'close'} />
            </Button>
          </Dialog.Close>

          {title && (
            <div className={s.Heading}>
              {isPublication && (
                <Button variant={'text_button'} className={s.BackIcon} onClick={() => onBack?.()}>
                  <UniversalIcon name={'arrow-ios-back'} />
                </Button>
              )}
              <Dialog.Title className={s.Title}>{title}</Dialog.Title>
              {isPublication && (
                <Button
                  variant={'text_button'}
                  aria-label="Close"
                  tabIndex={-1}
                  onClick={onPublish}
                >
                  Publish
                </Button>
              )}
            </div>
          )}

          <div className={s.publicationBody}>
            <div className={clsx(s.PicturePost, title && 'WithHeader')}>
              <Slider srcArray={srcArray} isSmall={isSmall} />
            </div>
            <div className={s.ContentPost}>{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
