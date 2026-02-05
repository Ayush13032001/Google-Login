const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../utils/googleConfig");
const userModel = require("../models/userModel");

/* ✅ SINGLE GOOGLE LOGIN HANDLER */
exports.googleAuth = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ message: "Authorization code missing" });
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const { email, name, picture } = userRes.data;

    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({ name, email, image: picture });
    }

    const token = jwt.sign(
      { _id: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMEOUT }
    );

    res.status(200).json({
      message: "success",
      token,
      user,
    });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
