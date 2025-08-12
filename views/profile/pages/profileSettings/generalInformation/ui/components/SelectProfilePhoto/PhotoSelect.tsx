'use client'

import React, { useEffect, useRef } from 'react'
import { PhotoModal } from '@/shared/modals/addPhotoModal'
import { Button } from '@irondragons/ui-lib-inctagram'

type PhotoSelectProps = {
  isOpen: boolean
  previewUrl: string[] | null
  onPhotoSelected: (urls: string[]) => void
  onClose: () => void
  isImage: boolean
}

export const PhotoSelect = ({
  isOpen,
  previewUrl,
  onPhotoSelected,
  onClose,
  isImage,
}: PhotoSelectProps) => {
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
      title={'Add a Profile Photo'}
      fileInputRef={fileInputRef}
      onFileChange={handleFileChange}
      isImage={isImage}
    >
      <Button fullWidth={true} onClick={handleSelectClick}>
        Select from Computer
      </Button>
    </PhotoModal>
  )
}
