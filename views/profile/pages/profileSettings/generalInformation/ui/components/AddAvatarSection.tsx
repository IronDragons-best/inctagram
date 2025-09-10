'use client'

import { useState } from 'react'
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { SelectProfilePhoto } from '@/views/profile/pages/profileSettings/generalInformation/ui/components/SelectProfilePhoto/SelectProfilePhoto'
import { useUploadAvatarProfileMutation } from '@/shared/schemas/api/profileApi'
import s from './components.module.scss'
import { useParams } from 'next/navigation'
import { showGlobalAlert } from '@/shared/hooks/useGlobalAlert'

export const AddAvatarSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [finalImage, setFinalImage] = useState<string | null>(null)
  const [modalMode, setModalMode] = useState<'photo' | 'delete'>('photo')

  const [uploadAvatarProfile] = useUploadAvatarProfileMutation()
  const { userId } = useParams<{ userId: string }>()

  const handleOpenModal = () => {
    setModalMode('photo')
    setIsModalOpen(true)
  }

  const handleSaveAvatar = async (file: File) => {
    try {
      await uploadAvatarProfile({ userId: Number(userId), file }).unwrap()
    } catch {
      showGlobalAlert('Avatar upload failed', 'error')
    }
  }

  return (
    <div className={s.leftContent}>
      <div className={s.avatarArea}>
        {finalImage ? (
          <div className={s.circleContainer}>
            <img src={finalImage} alt="Avatar" className={s.avatarImage} />
            <button
              className={s.closeIcon}
              onClick={e => {
                e.stopPropagation()
                e.preventDefault() // добавь это, если кнопка внутри форм
                setModalMode('delete')
                setIsModalOpen(true)
              }}
            >
              <UniversalIcon name="close" />
            </button>
          </div>
        ) : (
          <>
            <div className={s.circleButton}>
              <div className={s.icon}>
                <UniversalIcon name="image-outline" />
              </div>
            </div>
          </>
        )}
        <div className={s.avaButton}>
          <Button variant="outline" onClick={handleOpenModal}>
            Select Profile Photo
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <SelectProfilePhoto
          mode={modalMode}
          setFinalImage={setFinalImage}
          onClose={() => setIsModalOpen(false)}
          onSaveAvatar={handleSaveAvatar}
        />
      )}
    </div>
  )
}
