"use client";
import { Button, UniversalIcon } from "@irondragons/ui-lib-inctagram";
import { useState } from "react";
import { ModalChangePhoto } from "../ModalChangePhoto/ModalChangePhoto";
import { ModalDeleteAvatar } from "../ModalDeleteAvatar/ModalDeleteAvatar";
import { ModalPreviewImage } from "../ModalPreviewImage/ModalPreviewImage";
import s from "./components.module.scss";

export const AddAvatarSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const handleOpenModal = () => {
    setSelectedImage(null);
    setIsModalOpen(true);
  };
  return (
    <div className={s.leftContent}>
      <div className={s.avatarArea} onClick={handleOpenModal}>
        {finalImage ? (
          <div className={s.circleContainer}>
            <img src={finalImage} alt="Avatar" className={s.avatarImage} />
            <button
              className={s.closeIcon}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault(); // добавь это, если кнопка внутри форм
                setIsConfirmDeleteOpen(true);
              }}
            >
              <UniversalIcon name="close" />
            </button>
          </div>
        ) : (
          <>
            <div className={s.circleButton}>
              <div className={s.icon}>
                <UniversalIcon name="image-outline" />
              </div>
            </div>
            <div className={s.avaButton}>
              <Button variant="outline" onClick={handleOpenModal}>
                Select Profile Photo
              </Button>
            </div>
          </>
        )}
      </div>
      {isConfirmDeleteOpen && (
        <ModalDeleteAvatar
          isOpen={isConfirmDeleteOpen}
          onClose={() => setIsConfirmDeleteOpen(false)}
          onConfirm={() => {
            setFinalImage(null);
            setIsConfirmDeleteOpen(false);
          }}
        />
      )}
      <ModalChangePhoto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={(img) => {
          setSelectedImage(img);
          setIsImageModalOpen(true);
        }}
      />
      {isImageModalOpen && (
        <ModalPreviewImage
          selectedImage={selectedImage}
          position={position}
          setPosition={setPosition}
          setIsImageModalOpen={setIsImageModalOpen}
          setFinalImage={setFinalImage}
        />
      )}
    </div>
  );
};
