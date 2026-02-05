const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./models/dbConnection");

const authRoutes = require("./routes/authRouter");
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "https://google-login-3-frontend11.onrender.com",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: handle preflight explicitly
app.use(cors());


app.use(express.json());

/* ✅ ROOT ROUTE — MUST BE FIRST */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend is running 🚀",
  });
});

/* ✅ AUTH ROUTES */
app.use("/auth", authRoutes);

/* ✅ 404 — MUST BE LAST */
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on the server`,
  });
});

/* ✅ ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
