import React from 'react';

const FormError = ({ text }) => (
  <section style={{marginTop: "15px"}}>
    <p className="error_msg">{text}</p>
  </section>
);

export default FormError;
