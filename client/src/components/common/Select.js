import React from 'react';

const Select = ({ ariaLabel, name, value, text, field }) => (
    <select{...field} aria-label={ariaLabel} name={name}>
        <option value={value}>{text}</option>
        <option value={value}></option>
        <option value={value}></option>
        <option value={value}></option>
    </select>
);

export default Select;
