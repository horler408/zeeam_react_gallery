import React from 'react';

const DangerButton = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="danger_btn"
  >
    {text}
  </button>
);

export default DangerButton;
