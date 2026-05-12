import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

import {
  setTime,
  setDuration,
} from '../../redux/slices/editorSlice';

import { RootState } from '../../redux/store/store';

import TextOverlay, {
  TextOverlayRef,
} from '../TextOverlay/TextOverlay';

import styles from './Preview.module.scss';

const Preview = () => {
  const dispatch = useDispatch();

  const overlayRef =
    useRef<TextOverlayRef>(null);

  const [editMode, setEditMode] =
    useState(false);

  const {
    videoUrl,
    speed,
    filter,
  } = useSelector(
    (state: RootState) =>
      state.editor
  );

  return (
    <div>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button
          onClick={() =>
            setEditMode(!editMode)
          }
        >
          {editMode
            ? 'Done Editing'
            : 'Edit Text'}
        </button>

        <button
          onClick={() =>
            overlayRef.current?.addText()
          }
        >
          Add Text
        </button>

        <button
          onClick={() =>
            overlayRef.current?.addSticker(
              '🔥'
            )
          }
        >
          🔥
        </button>

        <button
          onClick={() =>
            overlayRef.current?.addSticker(
              '❤️'
            )
          }
        >
          ❤️
        </button>

        <button
          onClick={() =>
            overlayRef.current?.addSticker(
              '⭐'
            )
          }
        >
          ⭐
        </button>
      </div>

      {/* Preview */}
      <div className={styles.preview}>
        {videoUrl ? (
          <>
            <ReactPlayer
              key={videoUrl}
              src={videoUrl}
              controls
              width="100%"
              height="100%"
              playbackRate={speed}
              style={{
                filter,
              }}
              onTimeUpdate={(e) => {
                const currentTime =
                  e.currentTarget
                    .currentTime;

                dispatch(
                  setTime(
                    currentTime
                  )
                );
              }}
              onDurationChange={(e) => {
                const duration =
                  e.currentTarget
                    .duration;

                dispatch(
                  setDuration(
                    duration
                  )
                );
              }}
            />

            {/* Text Overlay */}
            <div
              className={
                styles.overlay
              }
              style={{
                pointerEvents:
                  editMode
                    ? 'auto'
                    : 'none',
              }}
            >
              <TextOverlay
                ref={
                  overlayRef
                }
              />
            </div>
          </>
        ) : (
          <div
            style={{
              color:
                'white',
              padding:
                '20px',
            }}
          >
            Upload a video
            to preview
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;