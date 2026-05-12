import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setVideo } from "../../redux/slices/editorSlice";
import styles from "./Upload.module.scss";

const MAX_FILE_SIZE = 500 * 1024 * 1024;

const Upload = () => {
  const dispatch = useDispatch();

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.includes("video")) {
        alert("Only MP4/WebM videos allowed");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        alert("File too large");
        return;
      }

      const url = URL.createObjectURL(file);
      dispatch(setVideo(file, url));
    },
    [dispatch]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={styles.upload}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className={styles.card}>
        <div className={styles.icon}>🎬</div>

        <h1 className={styles.title}>Import Your Video</h1>

        <p className={styles.subtitle}>
          Drag & drop your video or browse from your device
        </p>

        <label className={styles.button}>
          Choose File
          <input
            type="file"
            accept="video/mp4,video/webm"
            onChange={onInputChange}
          />
        </label>

        <p className={styles.note}>
          Supported formats: MP4, WebM • Max size: 500MB
        </p>
      </div>
    </div>
  );
};

export default Upload;