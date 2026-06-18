const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { ok } = require("../utils/apiResponse");
const User = require("../models/User");
const { validateEmail, validateProfileImageUrl } = require("../utils/validators");

const getProfile = asyncHandler(async (req, res) => {
  return ok(res, "Profile fetched successfully.", {
    user: req.user.toJSON(),
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ["name", "email", "profileImage"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates[field] = typeof req.body[field] === "string" ? req.body[field].trim() : req.body[field];
    }
  });

  if (updates.name !== undefined && updates.name.length > 80) {
    throw new ApiError(400, "Name cannot exceed 80 characters.", "INVALID_NAME");
  }

  if (updates.email) {
    updates.email = updates.email.toLowerCase();
    if (!validateEmail(updates.email)) {
      throw new ApiError(400, "Enter a valid email address.", "INVALID_EMAIL");
    }
  }

  if (updates.profileImage && !validateProfileImageUrl(updates.profileImage)) {
    throw new ApiError(400, "Profile image must be a valid URL.", "INVALID_PROFILE_IMAGE");
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  return ok(res, "Profile updated successfully.", {
    user: user.toJSON(),
  });
});

module.exports = {
  getProfile,
  updateProfile,
};
