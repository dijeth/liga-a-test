import React from 'react';
import { Link } from 'react-router-dom';
import { Role } from '../const';
import { userPropTypes } from '../prop-types';

const Header = ({ user }) => (
  <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="/">{`Users${user.role !== Role.GUEST ? ` | ${user.name} ${user.lastname}` : ''}`}</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav ml-auto">
          {
            user.role !== Role.GUEST
              ? <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
              : (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                </>
              )
          }
        </ul>
      </div>
    </nav>
  </header>

);

Header.propTypes = {
  user: userPropTypes.isRequired,
};

export default Header;
