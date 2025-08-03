// DeleteAvatarModal.tsx
import { Button } from "@irondragons/ui-lib-inctagram";
import { ModalPhoto } from "../ModalPhoto/ModalPhoto";
import s from "./modalLogOut.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ModalLogOut= ({ isOpen, onClose, onConfirm }: Props) => {
  return (
    <ModalPhoto modalTitle="log out" onClose={onClose} isModalOpen={isOpen}>
      <div className={s.confirmDeleteContent}>
        <p>Are you really want to log out of your account “Epam@epam.com”?</p>
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
