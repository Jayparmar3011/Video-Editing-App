import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ffmpegService from "../../services/ffmpegService";
import { updateVideoUrl } from "../../redux/slices/editorSlice";
import { RootState } from "../../redux/store/store";
import style from "./TrimControl.module.scss";

const TrimControls = () => {
  const dispatch = useDispatch();

  const videoFile = useSelector(
    (state: RootState) => state.editor.videoFile
  );

  const duration = useSelector(
    (state: RootState) => state.editor.duration
  );

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      setEnd(Math.floor(duration));
    }
  }, [duration]);

  const handleTrim = async () => {
    if (!videoFile) return;

    if (start >= end) {
      alert("End time must be greater than start time");
      return;
    }

    try {
      setLoading(true);

      const trimmedUrl = await ffmpegService.trimVideo(
        videoFile,
        start,
        end
      );

      dispatch(updateVideoUrl(trimmedUrl));
    } catch (err) {
      console.error(err);
      alert("Trim failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.wrapper}>

      {/* LEFT TOOL ICON */}
      <div className={style.left}>
        ✂
      </div>

      {/* CENTER TIMELINE */}
      <div className={style.center}>

        <div className={style.timeRow}>
          <span>{start}s</span>

          <div className={style.timeline}>
            <div
              className={style.active}
              style={{
                left: `${(start / duration) * 100}%`,
                width: `${((end - start) / duration) * 100}%`,
              }}
            />
          </div>

          <span>{end}s</span>
        </div>

        {/* hidden but functional sliders */}
        <div className={style.sliders}>
          <input
            type="range"
            min="0"
            max={Math.floor(duration)}
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
          />

          <input
            type="range"
            min="0"
            max={Math.floor(duration)}
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
          />
        </div>

      </div>

      {/* RIGHT ACTION */}
      <div className={style.right}>
        <button
          onClick={handleTrim}
          disabled={loading}
          className={style.button}
        >
          {loading ? "Processing..." : "Trim"}
        </button>
      </div>

    </div>
  );
};

export default TrimControls;