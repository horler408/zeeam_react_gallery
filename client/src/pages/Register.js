import React, { useState, useEffect, useContext } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import logo from './../assets/register.png';
import Label from './../components/common/Label';
import GradientButton from '../components/common/GradientButton';
import FormInput from './../components/common/FormInput';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import Hyperlink from '../components/common/Hyperlink';
import { publicFetch } from './../util/fetch';
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';


const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required(
      'First Name is required'
    ),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    phone: Yup.string().matches(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Phone number is not valid!').required('Phone Number is required!'),
    password: Yup.string().required('Password is required')
  });

export default function Register() {
    const authContext = useContext(AuthContext)
    const [signupSuccess, setSignupSuccess] = useState();
    const [signupError, setSignupError] = useState();
    const [loginLoading, setLoginLoading] = useState(false);
    const [redirectOnSignup, setRedirectOnSignup] = useState(false)

    const submitCredentials = async credentials => {
        try {
        setLoginLoading(true);
        const { data } = await publicFetch.post('auth/register', credentials)
        authContext.setAuthState(data)
        setSignupSuccess(data.message)
        setSignupError('')
        // redirect
        setTimeout(() => {
            setRedirectOnSignup(true)
        }, 1000)
        console.log(data)
        } catch (error) {
        setLoginLoading(false);
        const { data } = error.response;
        setSignupError(data.message);
        setSignupSuccess('');
        }
    }
    return (
        <div>
            {redirectOnSignup && <Redirect to='/dashboard' />}
            <section>
                <div className="register_container">
                    <div className="register_card">
                    <div>
                        <div className="avatar">
                        <img src={logo} alt="Logo" />
                        </div>
                        <h2 className="form_info">
                        Sign up for an account
                        </h2>
                        <p className="form_info">
                        Already have an account?{' '}
                        <Hyperlink to="login" text="Log in now" />
                        </p>
                    </div>
                    <Formik
                        initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        password: ''
                        }}
                        onSubmit={values =>
                        submitCredentials(values)
                        }
                        validationSchema={SignupSchema}
                    >
                        {() => (
                        <Form className="form">
                            {signupSuccess && (
                            <FormSuccess text={signupSuccess} />
                            )}
                            {signupError && (
                            <FormError text={signupError} />
                            )}
                            <input
                            type="hidden"
                            name="remember"
                            value="true"
                            />
                            <div>
                            <div className="names form_div">
                                <div className="names_item">
                                <div className="label">
                                    <Label text="First Name" />
                                </div>
                                <FormInput
                                    ariaLabel="First Name"
                                    styleName="form_input"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                />
                                </div>

                                <div className="names_item">
                                <div className="label">
                                    <Label text="Last Name" />
                                </div>
                                <FormInput
                                    ariaLabel="Last Name"
                                    styleName="form_input"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                />
                                </div>
                            </div>

                            <div className="form_div">
                                <div className="label">
                                    <Label text="Email Address" />
                                </div>
                                <FormInput
                                ariaLabel="Email"
                                styleName="form_input"
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                />
                            </div>
                            <div className="form_div">
                                <div className="label">
                                    <Label text="Phone Number" />
                                </div>
                                <FormInput
                                ariaLabel="Phone Number"
                                styleName="form_input"
                                name="phone"
                                type="text"
                                placeholder="Phone Number"
                                />
                            </div>

                            <div className="form_div">
                                <div className="label">
                                    <Label text="Password" />
                                </div>
                                <FormInput
                                ariaLabel="Password"
                                styleName="form_input"
                                name="password"
                                type="password"
                                placeholder="Password"
                                />
                            </div>
                            </div>

                            <div>
                            <GradientButton
                                styleName="reg-btn"
                                type="submit"
                                text="Sign Up"
                                loading={loginLoading}
                            />
                            <p className="home_return">Return to{' '}
                                <Hyperlink to="/" text="Home" />
                            </p>
                            </div>
                        </Form>
                        )}
                    </Formik>
                    </div>
                </div>
            </section>
        </div>
    );
};
