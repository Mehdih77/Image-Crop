import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Modal } from "react-bootstrap";
import CropImageModal from "./imgCrop/cropImageModal/CropImageModal";
import styles from "./FileUploader.module.scss";

const defaultProps = {
  //   placeholder: "فایل خود را بکشید و اینجا رها کنید و یا آنها را انتخاب نمایید",
  acceptAbelFiles: ".jpg,.jpeg,.png",
  maxFiles: 1,
};

function FileUploader({
  fileState,
  imgState,
  maxFiles = defaultProps.maxFiles,
  accept = defaultProps.acceptAbelFiles,
}) {
  const [files, setFiles] = fileState;
  const [binaryState, setBinaryState] = useState("");

  const onDropAccepted = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setBinaryState(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: accept,
    maxFiles: maxFiles,
    onDropAccepted,
    onDrop,
  });

  return (
    <>
      <div
        {...getRootProps({
          className: styles.dropzone,
        })}>
        <input {...getInputProps()} />
        <section className={styles.section}>
          <img src={`/images/icons/upload.svg`} alt="" className={styles.img} />
          <p>
            فایل خود را بکشید و اینجا رها کنید
            <br />
            <span>و یا آنها را انتخاب نمایید</span>
            <button className="btn">انتخاب تصویر کمپین</button>
          </p>
        </section>
      </div>
      <Modal
        onHide={() => setBinaryState("")}
        dialogClassName={styles.modal}
        show={binaryState?.length > 0}>
        <CropImageModal
          data={binaryState}
          onHide={() => setBinaryState("")}
          imgState={imgState}
        />
      </Modal>
    </>
  );
}

export default FileUploader;
