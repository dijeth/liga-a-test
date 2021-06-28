const Validate = require('./validate');
const Auth = require('./auth');

module.exports = {
  ...Validate,
  ...Auth,
};
