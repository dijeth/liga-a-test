const path = require('path');
const express = require('express');
const {
  mainRouter, loginRouter, logoutRouter, registerRouter,
} = require('./web');
const { render404, render500 } = require('../utils');
const { unauth } = require('../middelwares');

const { Router } = express;

const webRouter = (dataService) => {
  const router = new Router();

  router.use(express.urlencoded({ extended: false }));
  router.use(express.static(path.resolve(process.cwd(), 'public')));

  router.use('/', mainRouter());
  router.use('/login', unauth, loginRouter(dataService));
  router.use('/logout', logoutRouter(dataService));
  router.use('/register', unauth, registerRouter(dataService));

  router.use((req, res) => {
    render404(req, res);
  });

  router.use((err, req, res, next) => {
    console.error(err);
    render500(req, res);
    if (false) { next(); }
  });

  return router;
};

module.exports = {
  webRouter,
};
