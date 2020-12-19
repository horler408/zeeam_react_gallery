import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Label from './../components/common/Label';
import FormInput from './common/FormInput';
import GradientButton from './common/GradientButton';

const InventoryItemSchema = Yup.object().shape({
  name: Yup.string().required('Product Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Unit price is required'),
  category: Yup.string().required('Category selection is required'),
  imageUrl: Yup.string().required('You must choose an image to upload')
});


const InventoryItemForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: ''
      }}
      onSubmit={(values, { resetForm }) =>
        onSubmit(values, resetForm)
      }
      validationSchema={InventoryItemSchema}
      validateOnBlur={false}
    >
      {() => (
        <Form>
          <div className="">
            <div className="">
              <div className="">
                <Label text="Item Name" />
              </div>
              <FormInput
                ariaLabel="Name"
                name="name"
                type="text"
                placeholder="Item Name"
              />
            </div>

            <div className="">
              <div className="">
                <Label text="Description" />
              </div>
              <FormInput
                ariaLabel="Description"
                name="description"
                type="text"
                placeholder="Write a brief description of the product"
              />
            </div>

            <div className="">
              <div className="">
                <Label text="Price" />
              </div>
              <FormInput
                ariaLabel="Price"
                name="price"
                type="text"
                placeholder="Unit Price"
              />
            </div>
            <div className="">
              <label htmlFor="category">Category</label>
              <select className="" value="" onChange="">
                <option value="">-Select Category-</option>
                <option value="clothes">Clothes</option>
                <option value="fabrics">Fabrics</option>
                <option value="bed-sheets">Bed Sheets</option>
                <option value="shoes">Shoes</option>
                <option value="bags">Bags</option>
              </select>
            </div>

            <div>
              <label htmlFor="image-url">Image Upload</label>
              <input className="" 
                type="file"
                value=""
                onChange=""
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
