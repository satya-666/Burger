const notFound = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
    error: {
      code: "ROUTE_NOT_FOUND",
    },
  });
};

module.exports = {
  notFound,
};
