const { MongoClient } = require('mongodb');

async function connectMongoDB(host, port, dbName) {
  const uri = `mongodb://${host}:${port}`;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  return {
    connection: client,
    db: client.db(dbName),
  };
}

module.exports = {
  connectMongoDB,
};
