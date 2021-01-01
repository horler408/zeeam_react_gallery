import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Label from './../components/common/Label';
import FormInput from './common/FormInput';
import FormSelect from './common/FormSelect'
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
            <div className="form_div">
              <div className="label">
                <Label text="Item Name" />
              </div>
              <FormInput
                styleName=""
                ariaLabel="Name"
                name="name"
                type="text"
                placeholder="Item Name"
              />
            </div>

            <div className="form_div">
              <div className="label">
                <Label text="Description" />
              </div>
              <FormInput
                styleName=""
                ariaLabel="Description"
                name="description"
                type="text"
                placeholder="Write a brief description of the product"
              />
            </div>

            <div className="form_div">
              <div className="label">
                <Label text="Price" />
              </div>
              <FormInput
                styleName=""
                ariaLabel="Price"
                name="price"
                type="text"
                placeholder="Unit Price"
              />
            </div>
            
            <div className="form_div">
              <div className="label">
                <Label text="Category" />
              </div>
              <FormSelect
                className="form_select"
                ariaLabel="Category"
                name="category"
                type="select"
                placeholder="Category"
              />
            </div>

            <div className="form_div">
              <div className="label">
                <Label text="Image Upload" />
              </div>
              <FormInput
                className="image_file"
                ariaLabel="Image Upload"
                name="imageUrl"
                type="file"
              />
            </div>
          </div>

          <div>
            <GradientButton
              styleName="inv-btn" 
              type="submit" 
              text="Submit" 
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InventoryItemForm;
