import { Button } from '@irondragons/ui-lib-inctagram'
import { useRef } from 'react'
import { ModalPhoto } from '../ModalPhoto/ModalPhoto'
import s from './modalPreviewImage.module.scss'
type Props = {
  selectedImage: string | null
  position: { x: number; y: number }
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  setIsImageModalOpen: (open: boolean) => void
  setFinalImage: (img: string | null) => void
}
export const ModalPreviewImage = ({
  selectedImage,
  position,
  setPosition,
  setIsImageModalOpen,
  setFinalImage,
}: Props) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const handleDrag = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return
    setPosition(prev => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }))
  }
  const cropAndSaveImage = () => {
    if (!selectedImage || !imageRef.current) return

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
    setIsImageModalOpen(false)
  }

  return (
    <ModalPhoto
      modalTitle="preview image"
      onClose={() => setIsImageModalOpen(false)}
      isModalOpen={true}
    >
      <div className={s.circleImageContainer}>
        <div className={s.imageCropContainer}>
          {selectedImage && (
            <div className={s.cropWrapper} onMouseMove={handleDrag}>
              <img
                ref={imageRef}
                src={selectedImage}
                className={s.imageToCrop}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                }}
              />
              <div className={s.cropMask} />
            </div>
          )}
        </div>
        <div className={s.twoModalBtn}>
          <Button onClick={cropAndSaveImage}>Save</Button>
        </div>
      </div>
    </ModalPhoto>
  )
}
