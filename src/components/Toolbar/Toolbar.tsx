import React from 'react';
import Filters from '../Filters/Filter';
import SpeedControl from './SpeedControl';
import style from './Toolbar.module.scss';

const Toolbar = () => {
  return (
    <div className={style.toolbar}>
      <h2>Video Editor</h2>
      <Filters />
      <SpeedControl />
    </div>
  );
};

export default Toolbar;