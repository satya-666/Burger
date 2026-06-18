const jwt = require("jsonwebtoken");
const env = require("../config/env");

const signAccessToken = (user) =>
  jwt.sign(
    {
      sub: user._id.toString(),
      mobileNumber: user.mobileNumber,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );

module.exports = {
  signAccessToken,
};
