'use client';

import React, { ReactNode, useState } from 'react';
import { Button, Card, UniversalIcon } from '@irondragons/ui-lib-inctagram';
import { Dialog } from 'radix-ui';
import s from './dropdown.module.scss';

type Props = {
  isModalOpen: boolean;
  children?: ReactNode;
  onClose?: () => void;
};

export const Dropdown = ({
                           isModalOpen,
                           children,
                           onClose,
                         }: Props) => {
  return (
    <Dialog.Root onOpenChange={onClose} open={isModalOpen}>
        <Dialog.Overlay className={s.Overlay} />
        <Dialog.Title className={s.MainTitle}>
          {/* TODO Что-то должно быть внутри для поисковых роботов */}
        </Dialog.Title>
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



