const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

const connectDB = require("./config/db");
const configurePassport = require("./config/passport");

// Initialize Express App
const app = express();

// --- Main Server Function ---
const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Configure Passport
    configurePassport(passport);

    // 3. Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(
      session({
        secret: process.env.SESSION_SECRET, // Use secret from .env
        resave: false,
        saveUninitialized: false, // Best practice: only save sessions for logged-in users
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    // 4. Routes
    app.use("/auth", require("./routes/authRoutes"));
    app.get("/", (req, res) => {
      res.send("✅ API is running...");
    });

    // 5. Start Listening for Requests
    const PORT = process.env.PORT || 8082;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// --- Run the Server ---
startServer();
