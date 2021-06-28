const { createServer } = require('./create-server');
const {
  PORT, DB_HOST, DB_PORT, DB_NAME,
} = require('./config');
const { abort } = require('./utils');
const { UserService } = require('./user-service');
const { connectMongoDB } = require('./connect-mongodb');

(async () => {
  let mongo;

  try {
    mongo = await connectMongoDB(DB_HOST, DB_PORT, DB_NAME);
  } catch (err) {
    abort(`Error connecting database: ${err}`);
  }

  const userService = new UserService(mongo.db);

  try {
    await createServer(PORT, mongo.connection, userService);
    console.info(`Server started at port ${PORT}`);
  } catch (err) {
    await mongo.connection.close();
    abort(`Error starting server: ${err}`);
  }
})();
