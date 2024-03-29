import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Label from './../components/common/Label';
import FormInput from './common/FormInput';
import FormSelect from './common/FormSelect'
//import { publicFetch } from './../util/fetch';
import GradientButton from './common/GradientButton';

const InventoryItemSchema = Yup.object().shape({
  title: Yup.string().required('Product Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Unit price is required'),
  category: Yup.string().required('Category selection is required'),
  imageUrl: Yup.string().required('You must choose an image to upload')
});

const InventoryItemForm = ({ handleSubmit }) => {
    // const [inventory, setInventory] = useState();
    // const [signupSuccess, setSignupSuccess] = useState();
    // const [signupError, setSignupError] = useState();
    // const [loginLoading, setLoginLoading] = useState(false);
    // const [redirectOnSignup, setRedirectOnSignup] = useState(false)

    // const submitCredentials = async credentials => {
    //     try {
    //         setLoginLoading(true);
    //         const { data } = await publicFetch.post('api/product', credentials)
    //         setInventory(...inventory, data.inventoryItems)
    //         setSignupSuccess(data.message)
    //         setSignupError('')
    
    //         // redirect
    //         setTimeout(() => {
    //             setRedirectOnSignup(true)
    //         }, 1000)
    //         console.log(data)
    
    //     } catch (error) {
    //         setLoginLoading(false);
    //         const { data } = error.response;
    //         setSignupError(data.message);
    //         setSignupSuccess('');
    //         }
    //     }
    

  return (

    <Formik
      initialValues={{
        title: '',
        description: '',
        price: '',
        category: '',
        imageUrl: ''
      }}
      onSubmit={(values, { resetForm }) =>
        handleSubmit(values, resetForm)
      }
      validationSchema={InventoryItemSchema}
      validateOnBlur={false}
    >
      {() => (
        <Form>
          <div className="">
            <div className="form_div">
              <div className="label">
                <Label text="Title" />
              </div>
              <FormInput
                styleName=""
                ariaLabel="Title"
                name="title"
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
              <FormInput
                styleName=""
                ariaLabel="Category"
                name="category"
                type="text"
                placeholder="e.g Fabrics, shoes, bags, etc"
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
            <div className="featured">
              <div className="check-label">
                <Label text="Featured" />
              </div>
              <FormInput
                styleName="check-btn"
                ariaLabel="Featured"
                name="featured"
                type="checkbox"
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
                type="text"
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
