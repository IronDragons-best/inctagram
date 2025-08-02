'use client';
import { Button, UniversalIcon } from "@irondragons/ui-lib-inctagram";
import { useRef } from "react";
import { ModalPhoto } from "../ModalPhoto";
import s from "./ModalChangePhoto.module.scss";

interface ModalChangePhotoProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (image: string) => void;
}

export const ModalChangePhoto = ({
  isOpen,
  onClose,
  onSelectImage,
}: ModalChangePhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onSelectImage(e.target.result as string);
          onClose(); 
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ModalPhoto
      modalTitle="Add a profile photo"
      onClose={onClose}
      isModalOpen={isOpen}
    >
      <div className={s.contentModal}>
        <div className={s.kvadrat}>
          <div className={s.icon}>
            <UniversalIcon name="image-outline" />
          </div>
        </div>
        <div className={s.buttonModal}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <Button onClick={() => fileInputRef.current?.click()}>
            Select From Computer
          </Button>
        </div>
      </div>
    </ModalPhoto>
  );
};
