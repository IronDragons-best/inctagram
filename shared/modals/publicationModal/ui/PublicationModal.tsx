'use client';

import React, { ReactNode } from 'react';
import { Dialog } from 'radix-ui';
import s from '@/shared/modals/publicationModal/ui/publicationModal.module.scss';
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram';
import { usePathname, useRouter } from 'next/navigation';
import { Slider } from '@/shared/ui/slider';
import photo1 from '@/public/assets/img/photo_01.png';
import photo2 from '@/public/assets/img/photo_02.png';
import photo3 from '@/public/assets/img/photo_03.jpg';
import photo4 from '@/public/assets/img/photo_04.png';
import photo5 from '@/public/assets/img/stalinLike.jpg';
import clsx from 'clsx'
import { StaticImageData } from 'next/image';

const photosArray = [photo1, photo2, photo3, photo4, photo5];

type PublicationModalProps = {
  onCloseAction: () => void;
  isModalOpen: boolean;
  title?: 'Edit Post' | 'Publication';
  children: ReactNode;
  srcArray?: string | StaticImageData | (string | StaticImageData)[];
}

export const PublicationModal = ({
                                   onCloseAction,
                                   isModalOpen,
                                   title,
                                   children,
                                   srcArray
                                 }: PublicationModalProps) => {
  const isPublication = title === 'Publication';
  const router = useRouter();
  const pathname = usePathname();
  
  const handleOpenChange  = (open: boolean) => {
    if (!open) {
      router.push(pathname);
      onCloseAction();
    }
  };
  
  return (
    <Dialog.Root onOpenChange={handleOpenChange } open={isModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.Overlay} />
        <Dialog.Content className={s.Content}>
          <Dialog.Close asChild>
            <Button
              variant={'text_button'}
              className={s.IconButton}
              aria-label="Close"
              tabIndex={-1}
            >
              <UniversalIcon name={'close'} />
            </Button>
          </Dialog.Close>
          
          {title && <div className={s.Heading}>
            {isPublication && <div className={s.BackIcon}>
              <UniversalIcon name={'arrow-ios-back'} />
            </div>}
            <Dialog.Title className={s.Title}>{title}</Dialog.Title>
            {isPublication && <Button
              variant={'text_button'}
              aria-label="Close"
              tabIndex={-1}
            >
              Publish
            </Button>}
          </div>}
          
          <div className={s.publicationBody}>
            <div className={clsx(s.PicturePost, title && 'WithHeader')}>
              <Slider srcArray={srcArray ?? photosArray} />
            </div>
            <div className={s.ContentPost}>
              {children}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
