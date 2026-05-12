import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTool } from '../../redux/slices/editorSlice';
import { RootState } from './../../redux/store/store';
import styles from './Sidebar.module.scss';


const tools = [
  'Trim',
  'Filters',
  'Audio',
  'Export',
];

const Sidebar = () => {
  const dispatch = useDispatch();

  const activeTool = useSelector(
    (state: RootState) => state.editor.activeTool
  );
  const videoFile = useSelector(
  (state: RootState) => state.editor.videoFile
);

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Video Editor</h2>

      <div className={styles.tools}>
        {tools.map((tool) => (
         <button
  key={tool}
  className={
    !videoFile
      ? styles.tool
      : activeTool === tool
      ? styles.active
      : styles.tool
  }
  disabled={!videoFile}
  onClick={() =>
    videoFile && dispatch(setActiveTool(tool))
  }
>
  {tool}
</button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;