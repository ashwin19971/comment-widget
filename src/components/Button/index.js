import React, { Component } from 'react';

import './index.scss';

const Button = ({ label, isDisabled, className, handleBtnClick }) => (
  <button
    disabled={isDisabled}
    onClick={handleBtnClick}
    className={`btn-root ${className}`}
  >
    {label}
  </button>
);

export default Button;