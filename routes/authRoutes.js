const express = require("express");
const passport = require("passport");
const router = express.Router();
const { googleCallback } = require("../controllers/authController");

// Route để bắt đầu quá trình đăng nhập với Google
// Passport sẽ chuyển hướng người dùng đến trang đăng nhập của Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route callback mà Google sẽ chuyển hướng về sau khi người dùng xác thực
// Passport xử lý mã xác thực và gọi hàm googleCallback khi thành công
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failed", // Route nếu xác thực thất bại
    session: false, // Không dùng session của passport sau khi callback
  }),
  googleCallback // Hàm xử lý logic sau khi xác thực thành công
);

module.exports = router;
