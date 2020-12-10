import React from 'react';
import { useField } from 'formik';
import FormError from './FormError';
import Input from './Input';


const FormInput = ({
  name,
  type,
  style,
  placeholder
}) => {
  const [field, meta] = useField(name);
  return (
    <>
      <Input
        field={field}
        name={field.name}
        type={type}
        className={style}
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </>
  );
};

export default FormInput;
