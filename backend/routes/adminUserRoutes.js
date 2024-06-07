const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  login,
  logout,
  changePassword,
} = require("../controllers/adminUserController");

const router = require("express").Router();

// Create User
router.post("/", createUser);

// Get All Users
router.get("/", getUsers);

// Get Single User
router.get("/:id", getUser);

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

// Change Password
router.post("/password/:id", changePassword);

// Login User
router.post("/login", login);

// Logout User
router.post("/logout", logout);

module.exports = router;
