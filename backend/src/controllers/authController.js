const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { ok, created } = require("../utils/apiResponse");
const tokenService = require("../services/tokenService");
const User = require("../models/User");

const signup = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.", "MISSING_CREDENTIALS");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters.", "WEAK_PASSWORD");
  }

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    throw new ApiError(409, "An account with this email already exists.", "EMAIL_EXISTS");
  }

  const now = new Date();
  const user = await User.create({
    name: name ? String(name).trim() : "",
    email: email.toLowerCase().trim(),
    password,
    lastLogin: now,
  });

  const accessToken = tokenService.signAccessToken(user);

  return created(res, "Account created successfully.", {
    accessToken,
    tokenType: "Bearer",
    isNewUser: true,
    user: user.toJSON(),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.", "MISSING_CREDENTIALS");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    throw new ApiError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
  }

  user.lastLogin = new Date();
  await user.save();

  const accessToken = tokenService.signAccessToken(user);

  return ok(res, "Logged in successfully.", {
    accessToken,
    tokenType: "Bearer",
    isNewUser: false,
    user: user.toJSON(),
  });
});

const logout = asyncHandler(async (_req, res) => {
  return ok(res, "Logged out successfully. Remove the token from the client.");
});

module.exports = {
  signup,
  login,
  logout,
};
