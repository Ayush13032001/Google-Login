const express = require('express');
const Router = express.Router();
const { googleAuth } = require('../Controllers/authController');

Router.get("/google", googleAuth);

module.exports = Router; 