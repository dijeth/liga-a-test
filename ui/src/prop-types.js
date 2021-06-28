import PropTypes from 'prop-types';
import { Role } from './const';

const userPropTypes = PropTypes.shape({
  name: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.oneOf(Object.values(Role)),
});

export {
  userPropTypes,
};
