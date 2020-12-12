import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
//import classNames from 'classnames';

const GradientButton = ({
  type,
  text,
  styleName,
  loading,
  onClick
}) => {

  return (
    <button
      type={type}
      className={styleName}
      onClick={onClick}
    >
      {loading ? (
        <span className="flex items-center">
          <FontAwesomeIcon icon={faCircleNotch} spin />
          <span className="ml-2">Loading...</span>
        </span>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default GradientButton;
