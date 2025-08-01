// index.js (hoặc tên tệp chính của bạn)

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

const connectDB = require("./config/db");
const configurePassport = require("./config/passport");

// Initialize Express App
const app = express();

// --- CẤU HÌNH MIDDLEWARES VÀ ROUTES ---

// 1. Kết nối Database (Vercel sẽ quản lý kết nối này cho mỗi lần gọi)
connectDB();

// 2. Cấu hình Passport
configurePassport(passport);

// 3. Middlewares
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 4. Routes
app.use("/auth", require("./routes/authRoutes"));
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// --- BƯỚC QUAN TRỌNG NHẤT ---
// Export ứng dụng Express để Vercel có thể sử dụng
module.exports = app;
