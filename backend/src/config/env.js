require("dotenv").config();

const requiredInProduction = ["MONGODB_URI", "JWT_SECRET"];

if (process.env.NODE_ENV === "production") {
  requiredInProduction.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`${key} is required in production`);
    }
  });
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  corsOrigin:
    process.env.CORS_ORIGIN ||
    "http://localhost:3000,http://127.0.0.1:3000,https://burger-mu-sooty.vercel.app",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/burger",
  dbConnectionTimeoutMs: Number(process.env.DB_CONNECTION_TIMEOUT_MS) || 10000,
  jwtSecret: process.env.JWT_SECRET || "development-only-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  otpProvider: process.env.OTP_PROVIDER || "mock",
  otpExpiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES) || 5,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    verifyServiceSid: process.env.TWILIO_VERIFY_SERVICE_SID,
  },
};
