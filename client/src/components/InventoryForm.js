import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Label from './../components/common/Label';
import FormInput from './common/FormInput';
import GradientButton from './common/GradientButton';

const InventoryItemSchema = Yup.object().shape({
  name: Yup.string().required('Product Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Unit price is required')
});


const InventoryItemForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        price: '',
        category: '',
      }}
      onSubmit={(values, { resetForm }) =>
        onSubmit(values, resetForm)
      }
      validationSchema={InventoryItemSchema}
      validateOnBlur={false}
    >
      {() => (
        <Form>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Item Name" />
              </div>
              <FormInput
                ariaLabel="Name"
                name="name"
                type="text"
                placeholder="Item Name"
              />
            </div>

            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Description" />
              </div>
              <FormInput
                ariaLabel="Description"
                name="description"
                type="text"
                placeholder="Product Description"
              />
            </div>

            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Price" />
              </div>
              <FormInput
                ariaLabel="Price"
                name="price"
                type="text"
                placeholder="Unit Price"
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-full sm:w-1/4 mt-4">
              <GradientButton type="submit" text="Submit" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InventoryItemForm;
