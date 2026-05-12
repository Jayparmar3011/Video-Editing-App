import React, {
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  setAudio,
  updateVideoUrl,
} from '../../redux/slices/editorSlice';

import { RootState } from '../../redux/store/store';
import ffmpegService from '../../services/ffmpegService';

import styles from './Audio.module.scss';

const Audio = () => {
  const dispatch =
    useDispatch();

  const { videoFile } =
    useSelector(
      (
        state: RootState
      ) => state.editor
    );

  const [loading, setLoading] =
    useState(false);

  const [audioName, setAudioName] =
    useState('');

  const handleAudioUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (
        !file ||
        !videoFile
      ) {
        alert(
          'Please upload video first'
        );
        return;
      }

      setAudioName(
        file.name
      );

      try {
        setLoading(
          true
        );

        dispatch(
          setAudio({
            file,
            volume: 1,
            fadeIn: 0,
            fadeOut: 0,
          })
        );

        const mergedUrl =
          await ffmpegService.addAudioToVideo(
            videoFile,
            file,
            1
          );

        dispatch(
          updateVideoUrl(
            mergedUrl
          )
        );

        alert(
          'Audio added successfully!'
        );
      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          'Failed to add audio'
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <div
      className={
        styles.audioCard
      }
    >
      <h3
        className={
          styles.title
        }
      >
        Add Background Music
      </h3>

      <p
        className={
          styles.subtitle
        }
      >
        Upload audio to merge
        with your video
      </p>

      <label
        className={
          styles.uploadBtn
        }
      >
        {loading
          ? 'Processing...'
          : 'Choose Audio'}

        <input
          type="file"
          accept="audio/*"
          onChange={
            handleAudioUpload
          }
          hidden
          disabled={
            loading
          }
        />
      </label>

      {/* Show selected file name */}
      {audioName && (
        <p
          className={
            styles.fileName
          }
        >
          🎵 {audioName}
        </p>
      )}
    </div>
  );
};

export default Audio;