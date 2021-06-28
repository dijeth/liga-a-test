import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Page from '../components/page';
import { userService } from '../user-service';
import LoadingPage from './loading-page';
import ErrorPage from './error-page';
import userContext from '../context/user-context';

const FormPageStatus = {
  LOADING: 'loading',
  AUTHORIZED: 'authorized',
  UNAUTHORIZED: 'unauthorized',
  ERROR: 'error',
};

const FormPage = ({
  title, serviceMethodName, redirectTo, FormComponent,
}) => {
  const [status, setStatus] = React.useState(FormPageStatus.UNAUTHORIZED);
  const [errors, setErrors] = React.useState({});
  const [, setUser] = React.useContext(userContext);

  const formSubmitHandler = async (evt) => {
    evt.preventDefault();
    setStatus(FormPageStatus.LOADING);

    const formData = new FormData(evt.target);
    const data = Array.from(formData.entries())
      .reduce((acc, cur) => {
        const [name, value] = cur;
        return {
          ...acc,
          [name]: value,
        };
      }, {});

    try {
      const response = await userService[serviceMethodName](data);

      if (response.errors) {
        setErrors(response.errors);
        setStatus(FormPageStatus.UNAUTHORIZED);
      } else {
        setUser(response);
        setStatus(FormPageStatus.AUTHORIZED);
      }
    } catch (err) {
      setStatus(FormPageStatus.ERROR);
    }
  };

  switch (status) {
    case FormPageStatus.LOADING:
      return <LoadingPage />;

    case FormPageStatus.ERROR:
      return <ErrorPage />;

    case FormPageStatus.AUTHORIZED:
      return <Redirect to={redirectTo} />;

    default:
      return (
        <Page>
          <div className="row">
            <h1 className="mt-5 mb-5">{title}</h1>
          </div>
          <div className="row">
            <div className="col">
              <FormComponent
                onSubmit={formSubmitHandler}
                errors={errors}
              />
            </div>
            <div className="col" />
          </div>
        </Page>
      );
  }
};

FormPage.propTypes = {
  title: PropTypes.string.isRequired,
  serviceMethodName: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired,
  FormComponent: PropTypes.elementType.isRequired,
};

export default FormPage;
