const { mainRouter } = require('./main-router');
const { loginRouter } = require('./login-router');
const { logoutRouter } = require('./logout-router');
const { registerRouter } = require('./register-router');

module.exports = {
  mainRouter,
  loginRouter,
  logoutRouter,
  registerRouter,
};
