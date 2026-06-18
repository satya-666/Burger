const bcrypt = require("bcryptjs");
const twilio = require("twilio");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const otpStore = new Map();

const isTwilioConfigured = () =>
  env.twilio.accountSid && env.twilio.authToken && env.twilio.verifyServiceSid;

const createTwilioClient = () => twilio(env.twilio.accountSid, env.twilio.authToken);

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const sendMockOtp = async (mobileNumber) => {
  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const expiresAt = Date.now() + env.otpExpiryMinutes * 60 * 1000;

  otpStore.set(mobileNumber, {
    hashedOtp,
    expiresAt,
    attempts: 0,
  });

  console.log(`[mock-otp] ${mobileNumber}: ${otp}`);

  return {
    expiresInMinutes: env.otpExpiryMinutes,
    devOtp: env.nodeEnv === "production" ? undefined : otp,
  };
};

const sendTwilioOtp = async (mobileNumber) => {
  const client = createTwilioClient();

  await client.verify.v2
    .services(env.twilio.verifyServiceSid)
    .verifications.create({ to: mobileNumber, channel: "sms" });

  return {
    expiresInMinutes: env.otpExpiryMinutes,
  };
};

const sendOtp = async (mobileNumber) => {
  if (env.otpProvider === "twilio") {
    if (!isTwilioConfigured()) {
      throw new ApiError(500, "Twilio Verify credentials are not configured.", "OTP_PROVIDER_NOT_CONFIGURED");
    }

    return sendTwilioOtp(mobileNumber);
  }

  return sendMockOtp(mobileNumber);
};

const verifyMockOtp = async (mobileNumber, otp) => {
  const record = otpStore.get(mobileNumber);

  if (!record || record.expiresAt < Date.now() || record.attempts >= 5) {
    otpStore.delete(mobileNumber);
    return false;
  }

  record.attempts += 1;
  const isValid = await bcrypt.compare(otp, record.hashedOtp);

  if (isValid) {
    otpStore.delete(mobileNumber);
  }

  return isValid;
};

const verifyTwilioOtp = async (mobileNumber, otp) => {
  const client = createTwilioClient();

  const verification = await client.verify.v2
    .services(env.twilio.verifyServiceSid)
    .verificationChecks.create({ to: mobileNumber, code: otp });

  return verification.status === "approved";
};

const verifyOtp = async (mobileNumber, otp) => {
  if (env.otpProvider === "twilio") {
    if (!isTwilioConfigured()) {
      throw new ApiError(500, "Twilio Verify credentials are not configured.", "OTP_PROVIDER_NOT_CONFIGURED");
    }

    return verifyTwilioOtp(mobileNumber, otp);
  }

  return verifyMockOtp(mobileNumber, otp);
};

module.exports = {
  sendOtp,
  verifyOtp,
};
