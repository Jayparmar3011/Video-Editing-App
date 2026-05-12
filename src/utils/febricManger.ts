import * as fabric from 'fabric';

let canvas:
  fabric.Canvas | null =
  null;

export const setCanvas =
  (
    c: fabric.Canvas
  ) => {
    canvas = c;
  };

export const getCanvas =
  () => canvas;

export const addText = () => {
  if (!canvas) {
    console.log('Canvas not ready');
    return;
  }

  console.log('Adding text');

  const text = new fabric.IText(
    'Edit Me',
    {
      left: 100,
      top: 100,
      fill: '#ffffff',
      fontSize: 32,
      fontFamily: 'Arial',
    }
  );

  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
};
export const addSticker =
  (
    emoji: string
  ) => {
    if (!canvas)
      return;

    const sticker =
      new fabric.Text(
        emoji,
        {
          left: 150,
          top: 150,
          fontSize: 50,
        }
      );

    canvas.add(
      sticker
    );
  };

export const exportOverlay =
  () => {
    if (!canvas)
      return '';

    return canvas.toDataURL(
      {
        format:
          'png',
        multiplier: 1,
      }
    );
  };