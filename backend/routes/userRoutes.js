const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
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

module.exports = router;
