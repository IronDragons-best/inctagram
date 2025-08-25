'use client'

import React, { useEffect, useRef } from 'react'
import { PhotoModal } from 'shared/modals/addPhotoModal'
import { Button } from '@irondragons/ui-lib-inctagram'

type AddPhotoModalComponentProps = {
  isOpen: boolean
  previewUrl: string[] | null
  onPhotoSelected: (urls: string[]) => void
  onClose: () => void
  isImage: boolean
}

export const AddPhotoModalComponent = ({
  isOpen,
  previewUrl,
  onPhotoSelected,
  onClose,
  isImage,
}: AddPhotoModalComponentProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file))
      onPhotoSelected(urls)
    }
  }

  const handleSelectClick = () => {
    fileInputRef.current?.click()
  }

  // зачистка памяти
  useEffect(() => {
    return () => {
      previewUrl?.forEach?.(url => URL.revokeObjectURL(url))
    }
  }, [previewUrl])

  return (
    <PhotoModal
      onOpenChange={open => {
        if (!open) {
          onClose()
        }
      }}
      isModalOpen={isOpen}
      title={'Add Photo'}
      fileInputRef={fileInputRef}
      onFileChange={handleFileChange}
      isImage={isImage}
    >
      <>
        <Button fullWidth onClick={handleSelectClick}>
          Select from Computer
        </Button>
        <Button fullWidth variant={'outline'}>
          Open Draft
        </Button>
      </>
    </PhotoModal>
  )
}
