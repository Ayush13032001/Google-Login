const express = require("express");
const Router = express.Router();
const {
  googleAuth,
  googleCallback,
} = require("../controllers/authController");

Router.get("/google", googleAuth);
Router.get("/google/callback", googleCallback);

module.exports = Router;
