'use client'

import React, { useEffect, useRef, useState } from 'react'
import { PhotoModal } from '@/shared/modals/addPhotoModal'
import { Button } from '@irondragons/ui-lib-inctagram'
import s from '@/shared/modals/addPhotoModal/ui/photoModal.module.scss'

type PreviewImageProps = {
  isOpen: boolean
  previewUrl: string[] | null
  onClose: () => void
  isImage: boolean
  setFinalImage: (img: string | null) => void
}

export const PreviewImage = ({
  isOpen,
  previewUrl,
  onClose,
  isImage,
  setFinalImage,
}: PreviewImageProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)

  const handleDrag = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return
    setPosition(prev => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }))
  }

  const cropAndSaveImage = () => {
    if (!previewUrl || !imageRef.current) return

    const img = imageRef.current
    const naturalWidth = img.naturalWidth
    const naturalHeight = img.naturalHeight

    const displayedWidth = img.clientWidth
    const displayedHeight = img.clientHeight

    const size = 316

    const scaleX = naturalWidth / displayedWidth
    const scaleY = naturalHeight / displayedHeight

    const sx = -position.x * scaleX
    const sy = -position.y * scaleY

    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()

    const sourceWidth = size * (naturalWidth / displayedWidth)
    const sourceHeight = size * (naturalHeight / displayedHeight)

    ctx.drawImage(img, sx, sy, sourceWidth, sourceHeight, 0, 0, size, size)

    const croppedImage = canvas.toDataURL('image/png')
    setFinalImage(croppedImage)
    onClose()
  }

  useEffect(() => {
    return () => {
      previewUrl?.forEach?.(url => URL.revokeObjectURL(url))
    }
  }, [previewUrl])

  return (
    <div>
      <PhotoModal
        onOpenChange={open => {
          if (!open) {
            onClose()
          }
        }}
        isModalOpen={isOpen}
        title={'Add a Profile Photo'}
        isImage={isImage}
      >
        <div className={s.imageCropContainer}>
          <div className={s.cropWrapper} onMouseMove={handleDrag}>
            <img
              ref={imageRef}
              src={previewUrl?.[0] ?? ''}
              className={s.imageToCrop}
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
              }}
            />
            <div className={s.cropMask} />
          </div>
        </div>
        <div>
          <Button onClick={cropAndSaveImage}>Save</Button>
        </div>
      </PhotoModal>
    </div>
  )
}
