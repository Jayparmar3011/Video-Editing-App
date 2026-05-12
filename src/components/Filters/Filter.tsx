import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/slices/editorSlice";
import style from "./Filter.module.scss";

const Filters = () => {
  const dispatch = useDispatch();

  return (
    <div className={style.wrapper}>
      <button
        className={style.btn}
        onClick={() => dispatch(setFilter("none"))}
      >
        Normal
      </button>

      <button
        className={style.btn}
        onClick={() => dispatch(setFilter("grayscale(1)"))}
      >
        B&W
      </button>

      <button
        className={style.btn}
        onClick={() => dispatch(setFilter("sepia(1)"))}
      >
        Sepia
      </button>

      <button
        className={style.btn}
        onClick={() => dispatch(setFilter("contrast(1.5)"))}
      >
        Contrast
      </button>
    </div>
  );
};

export default Filters;