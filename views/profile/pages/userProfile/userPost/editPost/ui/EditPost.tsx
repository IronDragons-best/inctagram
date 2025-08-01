'use client';

import * as React from 'react';
import { useState } from 'react';
import s from './editPost.module.scss';
import { Button, TextAreaComponent, UniversalIcon } from '@irondragons/ui-lib-inctagram';
import Image from 'next/image';

import photo1 from '@/public/assets/img/photo_01.png';
import photo2 from '@/public/assets/img/photo_02.png';
import photo3 from '@/public/assets/img/photo_03.jpg';
import photo4 from '@/public/assets/img/photo_04.png';
import photo5 from '@/public/assets/img/stalinLike.jpg';
import { usePathname, useRouter } from 'next/navigation';
import { PublicationModal } from '@/shared/modals/publicationModal';



const photosArray = [photo1, photo2, photo3, photo4, photo5];

type Props = {
  openModal?: () => void;
  isModalOpen: boolean;
  id?: string;
  title?: 'withPublish' | 'withoutPublish';
  slides?: string[];
  srcArray?: string[];
};

export const EditPost = ({
                           openModal,
                           isModalOpen,
                           title,
                         }: Props) => {
  const [modalOpen, setModalOpen] = useState(isModalOpen);
  
  const router = useRouter();
  const pathname = usePathname();
  
  const handleOpenModal = () => {
    router.push(pathname);
    setModalOpen(false);
  };
  
  return (
    <PublicationModal isModalOpen={true} title={'Edit Post'}>
      <div className={s.ContentWrapper}>
        <div className={s.PostTitle}>
          <div className={s.UserAvatar}>
            <Image src={photo2} alt={'photo beach'} />
          </div>
          <span className={s.Username}>
            UserName
          </span>
        </div>
        <div className={s.AreaWrapper}>
          <TextAreaComponent id={'1'} fullWidth label={'Add publication descriptions'} >
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </TextAreaComponent>
        </div>
        <div className={s.ButtonWrapper}>
          <Button variant={'primary'}>Save Changes</Button>
        </div>
      </div>
    </PublicationModal>
  );
};



