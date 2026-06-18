const ApiError = require("../utils/ApiError");

const errorHandler = (error, _req, res, _next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      error: {
        code: "VALIDATION_ERROR",
        details: Object.values(error.errors).map((item) => item.message),
      },
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A user with the same unique field already exists.",
      error: {
        code: "DUPLICATE_FIELD",
        details: error.keyValue || null,
      },
    });
  }

  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const code = error instanceof ApiError ? error.code : "INTERNAL_SERVER_ERROR";
  const message = statusCode === 500 ? "Something went wrong." : error.message;

  if (statusCode === 500) {
    console.error(error);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      code,
      details: error.details || null,
    },
  });
};

module.exports = errorHandler;
