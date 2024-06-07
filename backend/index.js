const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Routes imports
const userRoutes = require("./routes/userRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");

// Routes
app.get("/", (req, res) => {
  return res.status(200).json("Welcome to ERR Backend");
});
app.use("/api/users", userRoutes);
app.use("/api/admin/users", adminUserRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB(app, PORT);
