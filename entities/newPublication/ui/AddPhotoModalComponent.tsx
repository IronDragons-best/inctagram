'use client';

import React, { useEffect, useRef } from 'react';
import { AddPhotoModal } from '@/shared/addPhotoModal';
import { Button } from '@irondragons/ui-lib-inctagram';

type AddPhotoModalComponentProps = {
  isOpen: boolean;
  previewUrl: string | null;
  onPhotoSelected: (url: string) => void;
  onClose: () => void;
}

export const AddPhotoModalComponent = ({
                                         isOpen,
                                         previewUrl,
                                         onPhotoSelected,
                                         onClose,
                                       }: AddPhotoModalComponentProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      
      const url = URL.createObjectURL(file);
      onPhotoSelected(url);
    }
  };
  
  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };
  
  // зачистка памяти
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  
  return (
    <AddPhotoModal onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}
                   isModalOpen={isOpen} title={'Add Photo'}>
      <>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button fullWidth={true} onClick={handleSelectClick}>Select from Computer</Button>
        <Button fullWidth={true} variant={'outline'}>Open Draft</Button>
      </>
    </AddPhotoModal>
  );
};