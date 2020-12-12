import React, { useState, useContext } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Hyperlink from './../components/common/Hyperlink';
import Label from './../components/common/Label';
import FormInput from './../components/common/FormInput';
import FormSuccess from './../components/FormSuccess';
import FormError from './../components/FormError';
import GradientButton from '../components/common/GradientButton';
import logo from './../assets/login.png';
import { publicFetch } from './../util/fetch'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Login = () => {
  const authContext = useContext(AuthContext)
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)

  const submitCredentials = async credentials => {
    try {
      setLoginLoading(true);
      const { data } = await publicFetch.post('auth/login', credentials)
      // console.log(data)
      authContext.setAuthState(data)
      setLoginSuccess(data.message)
      setLoginError('')
      setTimeout(() => {
        setRedirectOnLogin(true)
      }, 1000);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setLoginError(data.message);
      setLoginSuccess(null);
    }
  };

  return (
    <>
      {redirectOnLogin && <Redirect to='dashboard' />}
      <section>
          <div className="login_container">
            <div className="login_card">
              <div>
                <div className="avatar">
                  <img src={logo} alt="Logo" />
                </div>
                <h2 className="form_info">
                  Log in to your account
                </h2>
                <p className="form_info">
                  Don't have an account?{' '}
                  <Hyperlink
                    to="register"
                    text="Sign up now"
                  />
                </p>
              </div>

              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                onSubmit={values =>
                  submitCredentials(values)
                }
                validationSchema={LoginSchema}
              >
                {() => (
                  <Form className="form">
                    {loginSuccess && (
                      <FormSuccess text={loginSuccess} />
                    )}
                    {loginError && (
                      <FormError text={loginError} />
                    )}
                    <div>
                      <div className="form_div">
                        <div className="label">
                          <Label text="Email" />
                        </div>
                        <FormInput
                          styleName="form_input"
                          ariaLabel="Email"
                          name="email"
                          type="text"
                          placeholder="Email"
                        />
                      </div>

                      <div className="form_div">
                        <div className="label">
                          <Label text="Password" />
                        </div>
                        <FormInput
                          styleName="form_input"
                          ariaLabel="Password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <div className="form_info">
                      <div>
                        <Hyperlink
                          to="forgot-password"
                          text="Forgot your password?"
                        />
                      </div>
                    </div>

                    <div>
                      <GradientButton
                        styleName="log-btn"
                        type="submit"
                        text="Log In"
                        loading={loginLoading}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
      </section>
    </>
  );
};

export default Login;
