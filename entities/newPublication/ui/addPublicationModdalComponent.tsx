import React, { useState } from 'react';
import styles from './addPublicationModalComponent.module.scss';
import photo1 from '@/public/assets/img/photo_01.png';
import photo2 from '@/public/assets/img/photo_02.png';
import photo3 from '@/public/assets/img/photo_03.jpg';
import photo4 from '@/public/assets/img/photo_04.png';
import photo5 from '@/public/assets/img/stalinLike.jpg';
import { Slider } from '@/shared/ui/slider';
import { ContentNewPublication } from '@/entities/newPublication/ui/contentNewPublication';
import { PublicationModal } from '@/shared/modals/publicationModal/ui/PublicationModal';

const photosArray = [photo1, photo2, photo3, photo4, photo5];

export const AddPublicationModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div>
      <PublicationModal
        openModal={closeModal} isModalOpen={isModalOpen} title={'Publication'}
      >
        <div className={styles.bodyContent}>
          <div className={styles.Info}>
            <ContentNewPublication />
          </div>
        </div>
      
      </PublicationModal>
    </div>
  );
};
