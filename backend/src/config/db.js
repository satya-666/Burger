const mongoose = require("mongoose");
const env = require("./env");

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  mongoose.set("strictQuery", true);

  const connection = await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: env.dbConnectionTimeoutMs,
  });
  console.log(`MongoDB connected: ${connection.connection.host}`);

  cachedConnection = connection;
  return connection;
};

module.exports = connectDB;
