import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import userContext from '../context/user-context';

const Page = ({ children }) => {
  const [user] = React.useContext(userContext);
  return (
    <>
      <Header user={user} />
      <main className="container pt-5" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Page;
