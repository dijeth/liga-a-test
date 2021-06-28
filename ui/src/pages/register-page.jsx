import React from 'react';
import FormPage from './form-page';
import Form from '../components/register-form';

const RegisterPage = () => (
  <FormPage title="Registration" serviceMethodName="register" redirectTo="/login" FormComponent={Form} />
);

export default RegisterPage;
