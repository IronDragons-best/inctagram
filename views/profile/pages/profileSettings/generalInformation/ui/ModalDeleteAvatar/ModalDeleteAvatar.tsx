// DeleteAvatarModal.tsx
import { Button } from "@irondragons/ui-lib-inctagram";
import { ModalPhoto } from "../ModalPhoto";
import s from "./ModalDeleteAvatar.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ModalDeleteAvatar= ({ isOpen, onClose, onConfirm }: Props) => {
  return (
    <ModalPhoto modalTitle="Delete Photo" onClose={onClose} isModalOpen={isOpen}>
      <div className={s.confirmDeleteContent}>
        <p>Are you sure you want to delete this image?</p>
        <div className={s.confirmDeleteButtons}>
          <Button variant="outline" onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="primary" onClick={onClose}>
            No
          </Button>
        </div>
      </div>
    </ModalPhoto>
  );
};
