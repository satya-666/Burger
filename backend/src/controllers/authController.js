const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { ok, created } = require("../utils/apiResponse");
const otpService = require("../services/otpService");
const tokenService = require("../services/tokenService");
const User = require("../models/User");
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

const logout = asyncHandler(async (_req, res) => {
  return ok(res, "Logged out successfully. Remove the token from the client.");
});

module.exports = {
  sendOtp,
  verifyOtp,
  logout,
};
