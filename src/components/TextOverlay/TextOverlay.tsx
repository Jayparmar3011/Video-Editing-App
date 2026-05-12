import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import * as fabric from 'fabric';

export type TextOverlayRef = {
  addText: () => void;
  addSticker: (
    emoji: string
  ) => void;
  exportOverlay: () => string;
};

const TextOverlay = forwardRef<
  TextOverlayRef,
  {}
>((props, ref) => {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const fabricRef =
    useRef<fabric.Canvas | null>(
      null
    );

  useEffect(() => {
    if (!canvasRef.current)
      return;

    const canvas =
      new fabric.Canvas(
        canvasRef.current,
        {
          width: 800,
          height: 450,
          backgroundColor:
            'transparent',
          selection: true,
        }
      );

    fabricRef.current =
      canvas;

    return () => {
      canvas.dispose();
    };
  }, []);


  const addText = () => {
    const text =
      new fabric.IText(
        'Edit Me',
        {
          left: 100,
          top: 100,
          fill: '#ffffff',
          fontSize: 32,
          fontFamily:
            'Arial',
        }
      );

    fabricRef.current?.add(
      text
    );

    fabricRef.current?.setActiveObject(
      text
    );
  };

  const addSticker = (
    emoji: string
  ) => {
    const sticker =
      new fabric.Text(
        emoji,
        {
          left: 150,
          top: 150,
          fontSize: 50,
        }
      );

    fabricRef.current?.add(
      sticker
    );

    fabricRef.current?.setActiveObject(
      sticker
    );
  };

  const exportOverlay =
    (): string => {
      if (
        !fabricRef.current
      ) {
        return '';
      }

      return fabricRef.current.toDataURL(
        {
          format: 'png',
          multiplier: 2,
        }
      );
    };


  useImperativeHandle(
    ref,
    () => ({
      addText,
      addSticker,
      exportOverlay,
    })
  );

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
});

TextOverlay.displayName =
  'TextOverlay';

export default TextOverlay;