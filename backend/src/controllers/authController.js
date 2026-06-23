const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { ok, created } = require("../utils/apiResponse");
const otpService = require("../services/otpService");
const tokenService = require("../services/tokenService");
const User = require("../models/User");
const admin = require("../config/firebase");
const { normalizeMobileNumber, validateMobileNumber } = require("../utils/validators");

const sendOtp = asyncHandler(async (req, res) => {
  const mobileNumber = normalizeMobileNumber(req.body.mobileNumber);

  if (!validateMobileNumber(mobileNumber)) {
    throw new ApiError(400, "Enter a valid mobile number in E.164 format, for example +919876543210.", "INVALID_MOBILE_NUMBER");
  }

  const result = await otpService.sendOtp(mobileNumber);

  return ok(res, "OTP sent successfully.", {
    mobileNumber,
    channel: "sms",
    expiresInMinutes: result.expiresInMinutes,
    ...(result.devOtp ? { devOtp: result.devOtp } : {}),
  });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const mobileNumber = normalizeMobileNumber(req.body.mobileNumber);
  const otp = String(req.body.otp || "").trim();

  if (!validateMobileNumber(mobileNumber)) {
    throw new ApiError(400, "Enter a valid mobile number in E.164 format, for example +919876543210.", "INVALID_MOBILE_NUMBER");
  }

  if (!/^\d{4,8}$/.test(otp)) {
    throw new ApiError(400, "Enter a valid OTP.", "INVALID_OTP");
  }

  const isOtpValid = await otpService.verifyOtp(mobileNumber, otp);

  if (!isOtpValid) {
    throw new ApiError(401, "OTP verification failed.", "OTP_VERIFICATION_FAILED");
  }

  const now = new Date();
  let user = await User.findOne({ mobileNumber });
  let isNewUser = false;

  if (!user) {
    user = await User.create({
      name: req.body.name ? String(req.body.name).trim() : "",
      mobileNumber,
      email: req.body.email ? String(req.body.email).trim().toLowerCase() : undefined,
      isVerified: true,
      lastLogin: now,
    });
    isNewUser = true;
  } else {
    user.isVerified = true;
    user.lastLogin = now;
    await user.save();
  }

  const accessToken = tokenService.signAccessToken(user);
  const response = {
    accessToken,
    tokenType: "Bearer",
    isNewUser,
    user: user.toJSON(),
  };

  return isNewUser
    ? created(res, "Account created and verified successfully.", response)
    : ok(res, "Logged in successfully.", response);
});

const firebaseAuth = asyncHandler(async (req, res) => {
  const { idToken, name } = req.body;

  if (!idToken) {
    throw new ApiError(400, "Firebase ID token is required.", "MISSING_ID_TOKEN");
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const mobileNumber = decodedToken.phone_number;

  if (!mobileNumber) {
    throw new ApiError(400, "Phone number not found in Firebase token.", "MISSING_PHONE_NUMBER");
  }

  const now = new Date();
  let user = await User.findOne({ mobileNumber });
  let isNewUser = false;

  if (!user) {
    user = await User.create({
      name: name ? String(name).trim() : "",
      mobileNumber,
      isVerified: true,
      lastLogin: now,
    });
    isNewUser = true;
  } else {
    user.isVerified = true;
    user.lastLogin = now;
    if (name) user.name = String(name).trim();
    await user.save();
  }

  const accessToken = tokenService.signAccessToken(user);

  return isNewUser
    ? created(res, "Account created and verified successfully.", {
        accessToken,
        tokenType: "Bearer",
        isNewUser,
        user: user.toJSON(),
      })
    : ok(res, "Logged in successfully.", {
        accessToken,
        tokenType: "Bearer",
        isNewUser,
        user: user.toJSON(),
      });
});

const logout = asyncHandler(async (_req, res) => {
  return ok(res, "Logged out successfully. Remove the token from the client.");
});

module.exports = {
  sendOtp,
  verifyOtp,
  firebaseAuth,
  logout,
};
