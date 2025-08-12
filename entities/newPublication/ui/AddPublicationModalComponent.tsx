'use client'

import React from 'react'
import Image from 'next/image'
import { Input, TextAreaComponent } from '@irondragons/ui-lib-inctagram'
import { PublicationModal } from '@/shared/modals/publicationModal/ui/PublicationModal'
import styles from './addPublicationModalComponent.module.scss'

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
  return (
    <PublicationModal
      openModal={onCloseAction}
      isSmall
      isModalOpen={isOpen}
      title={'Publication'}
      srcArray={imageUrl}
      onBack={onBack}
      onRequestClose={onRequestClose}
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
