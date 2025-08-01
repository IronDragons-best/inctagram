"use client";
import { UniversalIcon } from "@irondragons/ui-lib-inctagram";
import { Dialog } from "radix-ui";
import { ReactNode } from "react";
import s from "./modalPhoto.module.scss";

type Props = {
  modalTitle: string;
  onClose: () => void;
  isModalOpen: boolean;
  children: ReactNode;
  selectedImage?: string | null;
  setSelectedImage?: (image: string | null) => void; 
};

export const ModalPhoto = ({
  onClose,
  isModalOpen,
  modalTitle,
  children,
}: Props) => {
  return (
    <Dialog.Root
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={s.Overlay} />
        <Dialog.Content className={s.Content}>
          <div className={s.Heading}>
            <Dialog.Title className={s.Title}>{modalTitle}</Dialog.Title>
            <Dialog.Close asChild>
              <button className={s.IconButton} aria-label="Close">
                <UniversalIcon name={"close"} />
              </button>
            </Dialog.Close>
          </div>
          <div className={s.Children}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
