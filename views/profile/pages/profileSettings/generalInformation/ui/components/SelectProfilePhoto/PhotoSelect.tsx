'use client'

import React, { useEffect, useRef, useState } from 'react'
import { PhotoModal } from '@/shared/modals/addPhotoModal'
import { Button } from '@irondragons/ui-lib-inctagram'

type PhotoSelectProps = {
  isOpen: boolean
  previewUrl: string[] | null
  onPhotoSelected: (urls: string[]) => void
  onClose: () => void
  isImage: boolean
}

const MAX_AVATAR_SIZE_BYTES = 10 * 1024 * 1024

export const PhotoSelect = ({
  isOpen,
  previewUrl,
  onPhotoSelected,
  onClose,
  isImage,
}: PhotoSelectProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const validFiles: File[] = []

    for (const file of files) {
      const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
      const isValidSize = file.size <= MAX_AVATAR_SIZE_BYTES

      if (!isValidType || !isValidSize) {
        setErrorMessage('The photo must be less than 10 Mb and have JPEG or PNG format')
        return
      }

      validFiles.push(file)
    }

    if (validFiles.length > 0) {
      const urls = validFiles.map(file => URL.createObjectURL(file))
      onPhotoSelected(urls)
      setErrorMessage(null)
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
      errorMessage={errorMessage}
    >
      <Button fullWidth onClick={handleSelectClick}>
        Select from Computer
      </Button>
    </PhotoModal>
  )
}
