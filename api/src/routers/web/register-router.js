const { Router } = require('express');
const csrf = require('csurf');
const { getValidateMiddleware } = require('../../middelwares');
const { render, getAuthRoles } = require('../../utils');
const { registerSchemaCsrf } = require('../../validation-schemas');

const viewData = {
  title: 'Registration',
  roles: getAuthRoles(),
  errors: {},
  oldData: {},
};

const csrfProtection = csrf({ cookie: true });
const validator = getValidateMiddleware(registerSchemaCsrf, 'register', viewData);

const registerRouter = (userService) => {
  const router = new Router();

  router.get('/', csrfProtection, (req, res) => {
    render('register', { ...viewData, csrf: req.csrfToken() }, req, res);
  });

  router.post('/', csrfProtection, validator, async (req, res, next) => {
    const {
      name,
      lastname,
      email,
      password,
      role,
    } = req.body;

    const user = {
      name,
      lastname,
      email,
      password,
      role,
    };

    try {
      if (await userService.find(email)) {
        const renderData = {
          ...viewData,
          csrf: req.body.csrf,
          oldData: user,
          errors: {
            email: ['A user with the same email address already exists'],
          },
        };

        render('register', renderData, req, res);
        return;
      }

      await userService.create(user);
      res.redirect('/login');
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = {
  registerRouter,
};
