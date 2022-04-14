import { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { getCroppedImg } from "../canvasUtils";
import ImgCrop from "../ImgCrop";
import styles from "./CropImageModal.module.scss";

export default function CropImageModal({ data, onHide, imgState }) {
  // CROP image
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = imgState;
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(data, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <>
      <Modal.Header className={styles.modalHeader}>
        <div>
          <span className={styles.userName}>ویرایش عکس</span>
        </div>
        <div
          onClick={() => {
            onHide();
            showCroppedImage();
          }}
          className={styles.downBtn}>
          <span>انجام شد</span>
          <i></i>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div>
          <ImgCrop data={data} onCropComplete={onCropComplete} />
        </div>
      </Modal.Body>
    </>
  );
}