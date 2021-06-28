import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit, errors }) => (
  <form method="post" onSubmit={onSubmit}>
    <div className="mb-3">
      <label htmlFor="email">Email</label>
      <input className="form-control" type="email" id="email" name="email" defaultValue={errors.old ? errors.old.email : ''} required />
      <p className="text-danger text-sm">{errors.email || ''}</p>
    </div>
    <div className="mb-3">
      <label htmlFor="password">Password</label>
      <input className="form-control" type="password" id="password" name="password" autoComplete="new-password" required />
      <p className="text-danger text-sm">{errors.password || ''}</p>
    </div>
    <div className="mt-6">
      <button className="btn btn-primary btn-md" type="submit">Login</button>
    </div>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
};

export default LoginForm;
