const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminUserSchema = new mongoose.Schema(
  {
    surname: { type: String, min: 2, required: true },
    othername: { type: String, min: 2, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  { timestamps: true }
);

// Hash password
adminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

adminUserSchema.pre("findOneAndUpdate", async function (next) {
  if (!this._update.password) {
    return next();
  }
  this._update.password = await bcrypt.hash(this._update.password, 10);
  next();
});

// Compare password
adminUserSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const AdminUserUser = mongoose.model("AdminUser", adminUserSchema);
module.exports = AdminUserUser;
