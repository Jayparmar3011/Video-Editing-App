import React, {
  useState,
} from 'react';

import {
  useSelector,
} from 'react-redux';

import { RootState } from '../../redux/store/store';
import ffmpegService from '../../services/ffmpegService';

import styles from './Export.module.scss';

const Export = () => {
  const { videoFile } =
    useSelector(
      (
        state: RootState
      ) => state.editor
    );

  const [
    exportingMp4,
    setExportingMp4,
  ] = useState(false);

  const [
    exportingWebm,
    setExportingWebm,
  ] = useState(false);

  const handleExport =
    async (
      format:
        | 'mp4'
        | 'webm'
    ) => {
      if (!videoFile) {
        alert(
          'Upload video first'
        );
        return;
      }

      try {
        if (
          format ===
          'mp4'
        ) {
          setExportingMp4(
            true
          );
        } else {
          setExportingWebm(
            true
          );
        }

        await ffmpegService.exportVideo(
          videoFile,
          format
        );
      } catch (
        error
      ) {
        console.error(
          error
        );
        alert(
          'Export failed'
        );
      } finally {
        setExportingMp4(
          false
        );
        setExportingWebm(
          false
        );
      }
    };

  return (
    <div
      className={
        styles.exportCard
      }
    >
      <h3
        className={
          styles.title
        }
      >
        Export Video
      </h3>

      <p
        className={
          styles.subtitle
        }
      >
        Download your edited
        video
      </p>

      <div
        className={
          styles.buttons
        }
      >
        <button
          className={
            styles.exportBtn
          }
          onClick={() =>
            handleExport(
              'mp4'
            )
          }
          disabled={
            exportingMp4
          }
        >
          {exportingMp4
            ? 'Exporting MP4...'
            : 'Export MP4'}
        </button>

        <button
          className={
            styles.exportBtn
          }
          onClick={() =>
            handleExport(
              'webm'
            )
          }
          disabled={
            exportingWebm
          }
        >
          {exportingWebm
            ? 'Exporting WEBM...'
            : 'Export WEBM'}
        </button>
      </div>
    </div>
  );
};

export default Export;