'use client';

import { AddPhotoModalComponent } from '@/entities/newPublication/ui/addPhotoModalComponent';
import { AddPublicationModalComponent } from '@/entities/newPublication/ui/addPublicationModdalComponent';
import { useState } from 'react';

export const NewPublication = () => {
  const [photoModalOpen, setPhotoModalOpen] = useState(true);
  const [publicationModalOpen, setPublicationModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handlePhotoSelected = (url: string) => {
    setPreviewUrl(url);
    setPhotoModalOpen(false);
    setPublicationModalOpen(true);
  };
  
  return (
    <div>
      <AddPhotoModalComponent
        isOpen={photoModalOpen}
        previewUrl={previewUrl}
        onPhotoSelected={handlePhotoSelected}
        onClose={() => {
          setPhotoModalOpen(false)}
        }
      />
      <AddPublicationModalComponent
        isOpen={publicationModalOpen}
        imageUrl={previewUrl as string}
        onCloseAction={() => setPublicationModalOpen(false)}
      />
    </div>
  );
};
