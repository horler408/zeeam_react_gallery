import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormSuccess = ({ text }) => (
  <section style={{textAlign: "center"}}>
    <p className="success_msg">
      <FontAwesomeIcon icon={faCheckCircle} />
      <span className="ml-1">{text}</span>
    </p>
  </section>
);

export default FormSuccess;
