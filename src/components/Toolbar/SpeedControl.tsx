import React from 'react';
import { useDispatch } from 'react-redux';
import { setSpeed } from '../../redux/slices/editorSlice';

const SpeedControl = () => {
  const dispatch =
    useDispatch();

  const speeds = [
    0.5,
    1,
    1.5,
    2,
  ];

  return (
    <div>
      {speeds.map(
        (speed) => (
          <button
            key={speed}
            onClick={() =>
              dispatch(
                setSpeed(
                  speed
                )
              )
            }
          >
            {speed}x
          </button>
        )
      )}
    </div>
  );
};

export default SpeedControl;