import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const ClipTimeline = () => {
  const clips = useSelector(
    (state: RootState) =>
      state.editor.clips
  );

  return (
    <div>
      {clips.map((clip) => (
        <div
          key={clip.id}
          style={{
            border: '1px solid white',
            margin: '5px',
            padding: '5px',
          }}
        >
          {clip.start}s - {clip.end}s
        </div>
      ))}
    </div>
  );
};

export default ClipTimeline;