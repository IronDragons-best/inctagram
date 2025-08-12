'use client'

import { useState } from 'react'
import { AddPhotoModalComponent } from '@/entities/newPublication/ui/AddPhotoModalComponent'
import { AddPublicationModalComponent } from '@/entities/newPublication/ui/AddPublicationModalComponent'

type NewPublicationProps = {
  onClose: () => void
}

export const NewPublication = ({ onClose }: NewPublicationProps) => {
  const [photoModalOpen, setPhotoModalOpen] = useState(true)
  const [publicationModalOpen, setPublicationModalOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string[]>([])
  const [isImage, setIsImage] = useState(true)

  const handlePhotoSelected = (urls: string[]) => {
    setPreviewUrl(urls)
    setPhotoModalOpen(false)
    setPublicationModalOpen(true)
    setIsImage(false)
  }

  const handlePublicationClose = () => {
    setPublicationModalOpen(false)
    onClose()
  }

  const handlePhotoModalClose = () => {
    setPhotoModalOpen(false)
    onClose()
  }

  const handleBackToPhotoModal = () => {
    setPublicationModalOpen(false)
    setPhotoModalOpen(true)
    setIsImage(true)
  }

  return (
    <div>
      <AddPhotoModalComponent
        isOpen={photoModalOpen}
        previewUrl={previewUrl}
        onPhotoSelected={handlePhotoSelected}
        onClose={handlePhotoModalClose}
        isImage={isImage}
      />
      <AddPublicationModalComponent
        isOpen={publicationModalOpen}
        imageUrl={previewUrl}
        onCloseAction={handlePublicationClose}
        onBack={handleBackToPhotoModal}
      />
    </div>
  )
}
