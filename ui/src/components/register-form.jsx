import React from 'react';
import PropTypes from 'prop-types';
import { Role } from '../const';

const RegisterForm = ({ onSubmit, errors }) => (
  <form method="post" onSubmit={onSubmit}>
    <div className="mb-3">
      <label htmlFor="name">Name</label>
      <input className="form-control" type="text" id="name" name="name" defaultValue={errors.old ? errors.old.name : ''} required />
      <p className="text-danger text-sm">{errors.name || ''}</p>
    </div>
    <div className="mb-3">
      <label htmlFor="lastname">Last name</label>
      <input className="form-control" type="text" id="lastname" name="lastname" defaultValue={errors.old ? errors.old.lastname : ''} required />
      <p className="text-danger text-sm">{errors.lastname || ''}</p>
    </div>
    <div className="mb-3">
      <label htmlFor="email">Email</label>
      <input className="form-control" type="text" id="email" name="email" defaultValue={errors.old ? errors.old.email : ''} required />
      <p className="text-danger text-sm">{errors.email || ''}</p>
    </div>
    <div className="mb-3">
      <label htmlFor="role">Role</label>
      <select className="custom-select d-block" id="role" name="role" defaultValue={errors.old ? errors.old.role : Role.ADMIN} required>
        <option value="admin">admin</option>
        <option value="user">user</option>
      </select>
    </div>
    <div className="mb-3">
      <label htmlFor="password">Password</label>
      <input className="form-control" type="password" id="password" name="password" autoComplete="new-password" required />
      <p className="text-danger text-sm">{errors.password || ''}</p>
    </div>
    <div className="mb-3">
      <label htmlFor="passwordRepeat">Repeat password</label>
      <input className="form-control" type="password" id="passwordRepeat" name="passwordRepeat" required />
      <p className="text-danger text-sm">{errors.passwordRepeat || ''}</p>
    </div>
    <div className="mt-6"><button className="btn btn-primary btn-md" type="submit">Register</button></div>
  </form>

);

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
};

export default RegisterForm;
