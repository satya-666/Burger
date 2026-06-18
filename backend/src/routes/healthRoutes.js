const express = require("express");
const mongoose = require("mongoose");
const { ok } = require("../utils/apiResponse");

const router = express.Router();

router.get("/health", (_req, res) => {
  return ok(res, "API is healthy.", {
    service: "burger-backend",
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
