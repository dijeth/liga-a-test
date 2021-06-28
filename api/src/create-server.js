const http = require('http');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { SESSION_SECRET, DB_NAME } = require('./config');
const { apiRouter, webRouter } = require('./routers');

const createServer = (port, dbConnection, dataService) => {
  const app = express();

  app.use(cookieParser());

  app.set('views', path.resolve(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: dbConnection,
      dbName: DB_NAME,
    }),
    cookie: {
      sameSite: false,
      httpOnly: false,
    },
  }));

  app.use('/api', apiRouter(dataService));
  app.use('/', webRouter(dataService));

  const server = http.createServer(app);

  return new Promise((resolve, reject) => {
    server.on('listening', resolve);
    server.on('error', reject);
    server.listen(port);
  });
};

module.exports = {
  createServer,
};
