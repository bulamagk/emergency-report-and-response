const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  authUser,
} = require("../controllers/userController");

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

// Auth User
router.post("/auth", authUser);

module.exports = router;
