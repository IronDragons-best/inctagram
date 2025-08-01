'use client';

import React, { ReactNode, useState } from 'react';
import { Card, UniversalIcon } from '@irondragons/ui-lib-inctagram';
import { Dialog } from 'radix-ui';
import s from './dropdown.module.scss';

type Props = {
  isModalOpen: boolean;
  children?: ReactNode;
};

export const Dropdown = ({
                           isModalOpen,
                           children,
                         }: Props) => {
  const [modalOpen, setModalOpen] = useState(isModalOpen);
  
  
  const handleOpenModal = () => {
    setModalOpen(false);
  };
  
  return (
    <Dialog.Root onOpenChange={handleOpenModal} open={modalOpen}>
      <Dialog.Content className={s.Content}>
        <Card fullWidth size={'sm'}>
          <div className={s.FieldCard}>
            <div className={s.IconField}>
              <UniversalIcon name={'edit-2-outline'} />
            </div>
            <div className={s.TextField}>
              Edit Post
            </div>
          </div>
          <div className={s.FieldCard}>
            <div className={s.IconField}>
              <UniversalIcon name={'trash-outline'} />
            </div>
            <div className={s.TextField}>
              Delete Post
            </div>
          </div>
        </Card>
      </Dialog.Content>
    </Dialog.Root>
  );
};



