import React, { useEffect, useRef, useState } from 'react';
import { AddPhotoModal } from '@/shared/addPhotoModal';
import { Button } from '@irondragons/ui-lib-inctagram';

export const AddPhotoModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
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
    <AddPhotoModal openModal={closeModal} isModalOpen={isModalOpen} title={"Add Photo"}>
      <>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button fullWidth={true} onClick={handleSelectClick}>Select from Computer</Button>
        <Button fullWidth={true} variant={"outline"}>Open Draft</Button>
        
        {previewUrl && (
          <div style={{ marginTop: '1rem' }}>
            <img
              src={previewUrl}
              alt="Selected preview"
              style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
            />
          </div>
        )}
      </>
    </AddPhotoModal>
  );
};