const express = require('express');
const cors = require('cors');
const { auth, getApiValidateMiddleware } = require('../middelwares');
const { loginSchema, registerSchema } = require('../validation-schemas');
const { DEFAULT_USER } = require('../const');

const { Router } = express;
const corsOptions = {
  origin: 'http://localhost:1338',
  credentials: true,
};

const loginValidator = getApiValidateMiddleware(loginSchema);
const registerValidator = getApiValidateMiddleware(registerSchema);

const apiRouter = (dataService) => {
  const router = new Router();
  router.use(cors(corsOptions));
  router.use(express.json());

  router.get('/test', (req, res) => res.json({ error: 'Error' }, 400));

  router.get('/auth', auth, async (req, res) => res.json(req.session.user));

  router.post('/auth', loginValidator, async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await dataService.auth(email, password);
      req.session.user = user;
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  });

  router.post('/user', registerValidator, async (req, res, next) => {
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
      if (await dataService.find(email)) {
        return res.json({ errors: { email: 'A user with the same email address already exists' } });
      }

      const createdUser = (await dataService.create(user)).ops[0];
      return res.json(createdUser);
    } catch (err) {
      return next(err);
    }
  });

  router.get('/logout', (req, res) => {
    req.session.destroy();
    return res.json({
      user: DEFAULT_USER,
    });
  });

  router.use((req, res) => res.status(404).json({ message: 'route not found' }));

  /* eslint-disable-next-line */
  router.use((err, req, res, next) => res.status(500).json({ message: err }));

  return router;
};

module.exports = {
  apiRouter,
};
