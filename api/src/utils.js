const bcrypt = require('bcrypt');
const {
  EXIT_CODE_ERROR, DEFAULT_USER, Role, BCRYPT_SALT,
} = require('./const');

const abort = (message) => {
  console.error(message);
  process.exit(EXIT_CODE_ERROR);
};

const render = (template, templateData, req, res, status = 200) => {
  res.status(status)
    .render(template, {
      user: req.session.user || DEFAULT_USER,
      path: req.baseUrl,
      ...templateData,
    });
};

const render404 = (req, res) => {
  render('404', { title: 'Page not found' }, req, res, 404);
};

const render500 = (req, res) => {
  render('500', { title: 'Uups...' }, req, res, 500);
};

const getAuthRoles = () => Object.values(Role).filter((it) => it !== Role.GUEST);

const joiExceptionToObject = (exception) => {
  const errors = {};

  exception.details.forEach((it) => {
    const { key } = it.context;
    if (!errors[key]) {
      errors[key] = [];
    }

    errors[key].push(it.message);
  });

  return errors;
};

const hashPassword = async (password) => bcrypt.hash(password, BCRYPT_SALT);
const comparePasswords = async (password, hash) => bcrypt.compare(password, hash);

module.exports = {
  abort,
  render,
  render404,
  render500,
  getAuthRoles,
  joiExceptionToObject,
  hashPassword,
  comparePasswords,
};
