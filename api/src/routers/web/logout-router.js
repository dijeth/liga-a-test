const { Router } = require('express');

const logoutRouter = () => {
  const router = new Router();

  router.get('/', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  return router;
};

module.exports = {
  logoutRouter,
};
