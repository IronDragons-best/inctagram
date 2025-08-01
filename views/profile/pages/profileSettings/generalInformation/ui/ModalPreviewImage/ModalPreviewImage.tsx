import { Button } from "@irondragons/ui-lib-inctagram";
import { useRef } from "react";
import { ModalPhoto } from "../ModalPhoto";
import s from "./ModalPreviewImage.module.scss";
type Props = {
  selectedImage: string | null;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setIsImageModalOpen: (open: boolean) => void;
  setFinalImage: (img: string | null) => void;
};
export const ModalPreviewImage = ({
  selectedImage,
  position,
  setPosition,
  setIsImageModalOpen,
  setFinalImage,
}: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const handleDrag = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    setPosition((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  };
  const cropAndSaveImage = () => {
    if (!selectedImage || !imageRef.current) return;

    const img = imageRef.current; // ссылка на DOM-элемент <img> в модалке
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const displayedWidth = img.clientWidth; // ширина в пикселях на экране
    const displayedHeight = img.clientHeight;

    // Размер итогового круга в px (диаметр)
    const size = 316;

    // Переводим сдвиг из координат DOM картинки в координаты исходного изображения
    // position — это сдвиг картинки в пикселях на экране, он отрицательный если сдвигаешь влево/вверх
    // Но на канвасе надо брать сдвиг в координатах исходника с учётом масштаба

    const scaleX = naturalWidth / displayedWidth;
    const scaleY = naturalHeight / displayedHeight;

    const sx = -position.x * scaleX; // координата X исходника, сдвиг
    const sy = -position.y * scaleY; // координата Y исходника, сдвиг

    // Создаем canvas нужного размера
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Обрезка круга
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Размеры области исходного изображения, которую надо взять с учётом масштаба
    // Для отрисовки на canvas область исходника должна соответствовать размеру size / scale
    // То есть нам нужно "вырезать" квадрат со стороной size / scale из исходника

    // Вычисляем сколько px исходника по ширине и высоте должны соответствовать size px на canvas
    const sourceWidth = size * (naturalWidth / displayedWidth);
    const sourceHeight = size * (naturalHeight / displayedHeight);

    // Отрисовываем картинку с нужным обрезанием и масштабированием
    ctx.drawImage(img, sx, sy, sourceWidth, sourceHeight, 0, 0, size, size);

    // Получаем итоговую картинку
    const croppedImage = canvas.toDataURL("image/png");
    setFinalImage(croppedImage);
    setIsImageModalOpen(false);
  };

  return (
    <ModalPhoto
      modalTitle="Preview Image"
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
  );
};
