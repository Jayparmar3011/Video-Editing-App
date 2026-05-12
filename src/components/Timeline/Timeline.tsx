import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../../redux/store/store';
import TrimControls from './TrimControl';

const Timeline = () => {
  const { currentTime = 0, duration = 0 } =
    useSelector((state: RootState) => state.editor || {});

  return (
    <div>
      <p>
        {Number(currentTime).toFixed(1)} /{' '}
        {Number(duration).toFixed(1)}
      </p>
      <TrimControls />
    </div>
  );
};

export default Timeline;