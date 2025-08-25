'use client'

import { PublicationModal } from '@/shared/modals/publicationModal/ui/PublicationModal'
import { useCreatePostMutation } from '@/shared/schemas/api/postsApi'
import { Input, TextAreaComponent } from '@irondragons/ui-lib-inctagram'
import Image from 'next/image'
import { useState } from 'react'
import s from './addPublicationModalComponent.module.scss'

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

      onCloseAction()
    } catch {
      // TODO ошибка
      console.log('Error while publishing post.')
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
      <div className={s.bodyContent}>
        <div className={s.info}>
          <div className={s.headerContent}>
            <div className={s.contentPost}>
              <div className={s.userAvatar}>
                {imageUrl[0] && (
                  <div style={{ marginBottom: '1rem' }}>
                    <Image src={imageUrl[0]} alt="Uploaded" width={400} height={300} />
                  </div>
                )}
              </div>
              <span className={s.userName}>URLProfile</span>
            </div>

            <TextAreaComponent
              fullWidth
              label={'Add publication descriptions'}
              id={'1'}
              placeholder={'Text-area'}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className={s.footerContent}>
            <Input
              placeholder={'choose your destiny'}
              fullWidth
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
