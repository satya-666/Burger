const express = require("express");
const authRoutes = require("./authRoutes");
const healthRoutes = require("./healthRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Burger API",
    data: {
      version: "1.0.0",
      endpoints: {
        health: "/api/health",
        auth: { sendOtp: "/api/auth/send-otp", verifyOtp: "/api/auth/verify-otp" },
        user: "/api/user/profile",
      },
    },
  });
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use(healthRoutes);

module.exports = router;
