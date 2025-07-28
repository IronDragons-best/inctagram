import React, { ReactNode } from 'react';
import { Dialog } from 'radix-ui';
import styles from '@/shared/modals/publicationModal/ui/publicationModal.module.scss';
import { Button } from '@irondragons/ui-lib-inctagram';

type AddPublicationModalProps = {
  openModal: () => void;
  isModalOpen: boolean;
  title?: string
  children: ReactNode
}

export const PublicationModal = ({
                                      openModal,
                                      isModalOpen,
                                      title,
                                      children,
                                    }: AddPublicationModalProps) => {
  return (
    <Dialog.Root onOpenChange={openModal} open={isModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <div className={styles.Heading}>
            <Dialog.Title className={styles.Title}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant={'text_button'}
                aria-label="Close"
                tabIndex={-1}
              >
                Publish
              </Button>
            </Dialog.Close>
          </div>
          <div className={styles.publicationBody}>
            <Dialog.Close asChild>{children}</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
