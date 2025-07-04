// routes/user.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user");
const { savedRedirectUrl } = require("../middleware");

// Signup
router.route("/signup")
  .get(userController.renderSignupForm)
  .post(userController.signup);

// Login
router.route("/login")
  .get(userController.renderLoginForm)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// Logout
router.get("/logout", userController.logout);

module.exports = router;
