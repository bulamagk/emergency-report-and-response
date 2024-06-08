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
const { verfiryToken } = require("../middlewares/authMiddleware");

const router = require("express").Router();

// Create User
router.post("/", createUser);

// Get All Users
router.get("/", verfiryToken, getUsers);

// Get Single User
router.get("/:id", verfiryToken, getUser);

// Update User
router.put("/:id", verfiryToken, updateUser);

// Delete User
router.delete("/:id", verfiryToken, deleteUser);

// Change Password
router.post("/password/:id", verfiryToken, changePassword);

// Login User
router.post("/login", login);

// Logout User
router.post("/logout", logout);

module.exports = router;
