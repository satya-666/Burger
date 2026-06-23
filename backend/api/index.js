const app = require("../src/app");
const connectDB = require("../src/config/db");

const PREFIX = "/_/backend";

module.exports = async (req, res) => {
  try {
    await connectDB();
    req.url = req.url.replace(PREFIX, "");
    app(req, res);
  } catch (error) {
    console.error("Serverless handler error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
