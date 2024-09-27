const express = require("express");
const { register, login, getUserInfo } = require("../../Controllers/User/userController");
const router = express.Router();
const authMiddleware = require("../../Middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getUserInfo);

module.exports = router;
