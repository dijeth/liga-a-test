const { Router } = require('express');
const { render } = require('../../utils');
const { getValidateMiddleware } = require('../../middelwares');
const { loginSchema } = require('../../validation-schemas');

const viewData = {
  title: 'Login',
  errors: {},
  oldData: {},
};

const validator = getValidateMiddleware(loginSchema, 'login', viewData);

const loginRouter = (dataService) => {
  const router = new Router();

  router.get('/', (req, res) => {
    render('login', viewData, req, res);
  });

  router.post('/', validator, async (req, res, next) => {
    const { email, password } = req.body;
    let user;

    try {
      user = await dataService.auth(email, password);
    } catch (err) {
      next(err);
      return;
    }

    if (!user) {
      const renderData = {
        ...viewData,
        oldData: { email },
        errors: {
          password: 'Email or password is incorrect',
        },
      };

      render('login', renderData, req, res);
      return;
    }

    req.session.user = user;
    res.redirect('/');
  });

  return router;
};

module.exports = {
  loginRouter,
};
