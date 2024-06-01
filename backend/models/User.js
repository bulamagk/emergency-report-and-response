const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    surname: { type: String, min: 2, required: true },
    othername: { type: String, min: 2, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
