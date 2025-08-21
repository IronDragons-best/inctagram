'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Input, TextAreaComponent } from '@irondragons/ui-lib-inctagram'
import { PublicationModal } from '@/shared/modals/publicationModal/ui/PublicationModal'
import styles from './addPublicationModalComponent.module.scss'
import { useCreatePostMutation } from '@/shared/schemas/api/postsApi'

const dataLocations = [
  { title: 'New York', place: 'Washington Square Park' },
  { title: 'Moscow', place: 'Red Square' },
]

type AddPublicationModalComponentProps = {
  isOpen: boolean
  imageUrl: string[]
  onCloseAction: () => void
  onBack: () => void
  onRequestClose: () => void
}

export const AddPublicationModalComponent = ({
  isOpen,
  imageUrl,
  onCloseAction,
  onBack,
  onRequestClose,
}: AddPublicationModalComponentProps) => {
  const [description, setDescription] = useState('')
  const [createPost] = useCreatePostMutation()

  const urlsToFiles = async (urls: string[]) => {
    const limited = urls.slice(0, 10) // сервер — до 10 изображений
    const files = await Promise.all(
      limited.map(async (u, i) => {
        const res = await fetch(u)
        const blob = await res.blob()
        const ext = (blob.type?.split('/')[1] ?? 'jpg').split('+')[0]
        return new File([blob], `photo_${i}.${ext}`, { type: blob.type || 'image/jpeg' })
      })
    )
    return files
  }

  const handlePublish = async () => {
    if (!imageUrl?.length || !description.trim()) return

    try {
      const form = new FormData()

      form.append('description', description.trim())

      const files = await urlsToFiles(imageUrl)
      files.forEach(f => form.append('files', f))

      await createPost(form as unknown as any).unwrap()

      onRequestClose()
    } catch {
      // ошибка
    }
  }

  return (
    <PublicationModal
      openModal={onCloseAction}
      isSmall
      isModalOpen={isOpen}
      title={'Publication'}
      srcArray={imageUrl}
      onBack={onBack}
      onRequestClose={onRequestClose}
      onPublish={handlePublish}
    >
      <div className={styles.bodyContent}>
        <div className={styles.Info}>
          <div className={styles.headerContent}>
            <div className={styles.contentPost}>
              <div className={styles.userAvatar}>
                {imageUrl[0] && (
                  <div style={{ marginBottom: '1rem' }}>
                    <Image src={imageUrl[0]} alt="Uploaded" width={400} height={300} />
                  </div>
                )}
              </div>
              <span className={styles.Username}>URLProfile</span>
            </div>

            <TextAreaComponent
              fullWidth={true}
              label={'Add publication descriptions'}
              id={'1'}
              placeholder={'Text-area'}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.footerContent}>
            <Input
              placeholder={'choose your destiny'}
              fullWidth={true}
              label={'Add location'}
              inputType={'location'}
            />
            {dataLocations.map(dataLocation => (
              <>
                <h5>{dataLocation.title}</h5>
                <span>{dataLocation.place}</span>
              </>
            ))}
          </div>
        </div>
      </div>
    </PublicationModal>
  )
}
