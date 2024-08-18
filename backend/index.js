const express = require("express");
// const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 3001;

const app = express();
// const io = new Server(app);

// Middleware
const allowedOrigins = ["http://localhost:3001", "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Origin is allowed
    } else {
      callback(new Error("Not allowed by CORS")); // Origin is not allowed
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); // For Frontend App
// app.use(cors("*")); //For Postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// io.on("connection", (socket) => {
//   console.log("User Connected");
// });

connectDB(app, PORT);
