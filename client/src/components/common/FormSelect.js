import React from 'react';
import { useField } from 'formik';
import FormError from './FormError';
import Select from './Select';


const FormSelect = ({
  name,
  type,
  styleName,
  value
}) => {
  const [field, meta] = useField({name: name, value: value});
  return (
    <>
        <Select
            field={field}
            name={field.name}
            type={type}
            className={styleName}
            value={field.value}
        />
        {meta.touched && meta.error ? (
            <FormError text={meta.error}></FormError>
        ) : null}
    </>
  );
};

export default FormSelect;
