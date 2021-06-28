const { DEFAULT_USER, Role } = require('../const');
const { render404 } = require('../utils');

const unauth = (req, res, next) => {
  if (req.session.user && req.session.user.role !== Role.GUEST) {
    render404(req, res);
    return;
  }

  next();
};

const auth = (req, res, next) => {
  if (!req.session.user) {
    res.status = 401;
    req.session.user = DEFAULT_USER;
  }

  next();
};

module.exports = {
  auth,
  unauth,
};
