import React, { useState } from 'react'
import { PhotoSelect } from '@/views/profile/pages/profileSettings/generalInformation/ui/components/SelectProfilePhoto/PhotoSelect'
import { PreviewImage } from '@/views/profile/pages/profileSettings/generalInformation/ui/components/SelectProfilePhoto/PreviewImage'
import { DeleteImage } from '@/views/profile/pages/profileSettings/generalInformation/ui/components/SelectProfilePhoto/DeleteImage'

type SelectProfilePhotoProps = {
  mode: 'photo' | 'delete'
  onClose: () => void
  setFinalImage: (img: string | null) => void
}

export const SelectProfilePhoto = ({ mode, onClose, setFinalImage }: SelectProfilePhotoProps) => {
  const [photoModalOpen, setPhotoModalOpen] = useState(mode === 'photo')
  const [deleteModalOpen, setDeleteModalOpen] = useState(mode === 'delete')
  const [previewImageOpen, setPreviewImageOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string[]>([])
  const [isImage, setIsImage] = useState(true)

  const handlePhotoSelected = (urls: string[]) => {
    setPreviewUrl(urls)
    setPhotoModalOpen(false)
    setPreviewImageOpen(true)
    setIsImage(false)
  }

  const handlePreviewImageClose = () => {
    setPreviewImageOpen(false)
    onClose()
  }

  return (
    <>
      <PhotoSelect
        isOpen={photoModalOpen}
        previewUrl={previewUrl}
        onPhotoSelected={handlePhotoSelected}
        onClose={onClose}
        isImage={isImage}
      />
      <PreviewImage
        isOpen={previewImageOpen}
        previewUrl={previewUrl}
        onClose={handlePreviewImageClose}
        isImage={isImage}
        setFinalImage={setFinalImage}
      />
      <DeleteImage
        setFinalImage={setFinalImage}
        isOpen={deleteModalOpen}
        onClose={onClose}
        openModalType={setDeleteModalOpen}
      />
    </>
  )
}
