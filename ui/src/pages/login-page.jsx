import React from 'react';
import FormPage from './form-page';
import Form from '../components/login-form';

const LoginPage = () => (
  <FormPage title="Login" serviceMethodName="login" redirectTo="/" FormComponent={Form} />
);

export default LoginPage;
