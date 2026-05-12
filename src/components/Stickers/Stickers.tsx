import React from 'react';

const stickers = [
  '😀',
  '🔥',
  '🎬',
  '⭐',
];

const Stickers = () => {
  return (
    <div>
      <h3>Stickers</h3>

      {stickers.map((s) => (
        <button key={s}>
          {s}
        </button>
      ))}
    </div>
  );
};

export default Stickers;