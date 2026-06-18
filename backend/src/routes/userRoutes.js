const express = require("express");
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);

module.exports = router;
