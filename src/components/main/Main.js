import { useState } from "react";
import { changeByteToKByte } from "../../utils/changeByteToKByte";
import FileUploader from "../fileUploader/FileUploader";
import styles from "./Main.module.scss";

export default function Main() {
  const [attachment, setAttachment] = useState([]);
  const handleClose = (file) => {
    const array = attachment.filter((item) => item.path !== file.path);
    setAttachment(array);
  };
  const [imageSrc, setImageSrc] = useState(null);

  return (
    <section className={styles.main}>
      <div className={styles.message}>
        <span className={styles.picTitle}>تصویر اصلی </span>
        {imageSrc ? (
          <div className={styles.uploadedPicWrapper}>
            <div className={styles.right}>
              <img src={imageSrc} alt="campaign new-campaign" />
            </div>
            <div className={styles.left}>
              <span>تصویر اصلی </span>
              <div>
                <span className={styles.gray}>حجم عکس : </span>
                <span>{changeByteToKByte(attachment[0]?.size)} KB</span>
              </div>
              <button
                onClick={() => {
                  setImageSrc(null);
                  setAttachment([]);
                }}
                className="btn">
                انتخاب یک عکس دیگر
              </button>
            </div>
          </div>
        ) : (
          <FileUploader
            fileState={[attachment, setAttachment]}
            imgState={[imageSrc, setImageSrc]}
            handleRemoveFile={handleClose}
          />
        )}
      </div>
    </section>
  );
}