const { Router } = require('express');
const { render } = require('../../utils');

const mainRouter = () => {
  const router = new Router();

  router.get('/', (req, res) => {
    render('main', {}, req, res);
  });

  return router;
};

module.exports = {
  mainRouter,
};
