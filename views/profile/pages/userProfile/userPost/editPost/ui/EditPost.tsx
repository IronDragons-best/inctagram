'use client'

import { Button, TextAreaComponent } from '@irondragons/ui-lib-inctagram'
import Image from 'next/image'
import { useState } from 'react'
import s from './editPost.module.scss'

import photo1 from '@/public/assets/img/photo_01.png'
import photo2 from '@/public/assets/img/photo_02.png'
import photo3 from '@/public/assets/img/photo_03.jpg'
import photo4 from '@/public/assets/img/photo_04.png'
import photo5 from '@/public/assets/img/stalinLike.jpg'
import { PublicationModal } from '@/shared/modals/publicationModal'
import { usePathname, useRouter } from 'next/navigation'

const photosArray = [photo1, photo2, photo3, photo4, photo5]

type Props = {
  openModal?: () => void
  isModalOpen: boolean
  id?: string
  title?: 'withPublish' | 'withoutPublish'
  slides?: string[]
  srcArray: string[]
  onSave: (description: string) => void
}

export const EditPost = ({ openModal, isModalOpen, title, srcArray, onSave }: Props) => {
  const [modalOpen, setModalOpen] = useState(isModalOpen)
  const [description, setDescription] = useState('')

  const router = useRouter()
  const pathname = usePathname()

  const handleOpenModal = () => {
    router.push(pathname)
    setModalOpen(false)
  }

  return (
    <PublicationModal isModalOpen={true} title={'Edit Post'} srcArray={srcArray}>
      <div className={s.ContentWrapper}>
        <div className={s.PostTitle}>
          <div className={s.UserAvatar}>
            <Image src={photo2} alt={'photo beach'} />
          </div>
          <span className={s.Username}>UserName</span>
        </div>
        <div className={s.AreaWrapper}>
          <TextAreaComponent
            id={'1'}
            fullWidth
            label={'Add publication descriptions'}
            value={description}
            onChange={e => setDescription(e.target.value)}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </TextAreaComponent>
        </div>
        <div className={s.ButtonWrapper}>
          <Button variant={'primary'} onClick={() => onSave(description)}>
            Save Changes
          </Button>
        </div>
      </div>
    </PublicationModal>
  )
}
