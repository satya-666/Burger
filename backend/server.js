const app = require("./src/app");
const connectDB = require("./src/config/db");
const env = require("./src/config/env");

if (process.env.VERCEL) {
  module.exports = async (req, res) => {
    await connectDB();
    app(req, res);
  };
} else {
  let server;

  const startServer = async () => {
    try {
      await connectDB();

      server = app.listen(env.port, () => {
        console.log(`Burger backend running on port ${env.port}`);
      });

      server.on("error", (error) => {
        console.error("Failed to listen for requests:", error);
        process.exit(1);
      });
    } catch (error) {
      console.error("Failed to start backend:", error);
      process.exit(1);
    }
  };

  const shutdown = (signal) => {
    console.log(`${signal} received. Shutting down backend.`);
    if (server) {
      server.close(() => process.exit(0));
      return;
    }
    process.exit(0);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  startServer();
}
