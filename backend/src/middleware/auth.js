const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token is required.", "AUTH_TOKEN_REQUIRED");
  }

  const token = header.slice("Bearer ".length);
  let payload;

  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch (_error) {
    throw new ApiError(401, "Authentication token is invalid or expired.", "INVALID_AUTH_TOKEN");
  }

  const user = await User.findById(payload.sub);

  if (!user || !user.isVerified) {
    throw new ApiError(401, "User is not authorized.", "UNAUTHORIZED_USER");
  }

  req.user = user;
  req.auth = payload;
  next();
});

module.exports = {
  authenticate,
};
