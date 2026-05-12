import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

import Upload from '../Upload/Upload';
import Preview from '../Preview/Preview';
import Sidebar from '../Sidebar/Sidebar';

import Filters from '../Filters/Filter';
import Audio from '../Audio/Audio';
import Export from '../Export/Export';
import TrimControls from '../Timeline/TrimControl';

import styles from './Editor.module.scss';

const Editor = () => {
  const {
    activeTool,
    videoFile,
  } = useSelector(
    (state: RootState) =>
      state.editor
  );

  const renderActiveTool =
    () => {
      switch (
        activeTool
      ) {
        case 'Trim':
          return (
            <TrimControls />
          );

        case 'Filters':
          return (
            <Filters />
          );

        case 'Audio':
          return (
            <Audio />
          );

        case 'Export':
          return (
            <Export />
          );

        default:
          return (
            <div
              className={
                styles.emptyTool
              }
            >
              Select a tool
              to start
              editing
            </div>
          );
      }
    };

  return (
    <div
      className={
        styles.editor
      }
    >
      <div
        className={
          styles.main
        }
      >
        <Sidebar />

        <div
          className={
            styles.content
          }
        >
          {!videoFile ? (
            <div
              className={
                styles.uploadWrapper
              }
            >
              <Upload />
            </div>
          ) : (
            <>
              <Preview />

              <div
                className={
                  styles.toolPanel
                }
              >
                {renderActiveTool()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;