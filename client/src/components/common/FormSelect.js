import React from 'react';
import { useField } from 'formik';
import FormError from './FormError';
import Select from './Select';


const FormSelect = ({
  name,
  type,
  styleName
}) => {
  const [field, meta] = useField(name);
  return (
    <>
        <Select
            field={field}
            name={name}
            type={type}
            className={styleName}
        >
          <option value="">-Select Category-</option>
          <option value="clothes">Clothes</option>
          <option value="fabrics">Fabrics</option>
          <option value="bed-sheets">Bed Sheets</option>
          <option value="shoes">Shoes</option>
          <option value="bags">Bags</option>
        </Select>
        {meta.touched && meta.error ? (
            <FormError text={meta.error}></FormError>
        ) : null}
    </>
  );
};

export default FormSelect;
