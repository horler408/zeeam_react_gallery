import React from 'react';

const Select = ({ ariaLabel, name, field, children }) => (
    <select{...field} aria-label={ariaLabel} name={name} >
        {children}
    </select>
);

export default Select;
