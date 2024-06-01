const User = require("../models/User");

// Create User*****************************************************************
const createUser = async (req, res) => {
  const { surname, othername, email, phone } = req.body;

  if (!(surname && othername && email && phone)) {
    return res.status(400).json({ message: "Please enter all fields." });
  }

  try {
    // Check email
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res
        .status(409)
        .json({ message: `User with email [${email}] already exist!` });
    }

    // Check phone
    const phoneExist = await User.findOne({ phone });
    if (phoneExist) {
      return res
        .status(409)
        .json({ message: `User with phone number [${phone}] already exist!` });
    }

    // Create user
    const user = await User.create({ surname, othername, email, phone });

    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};

// Get Users*******************************************************************
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};
// Get Single User*************************************************************
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};
// Update Users****************************************************************
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Update user
    console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};
// Delete Users****************************************************************
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Delete user
    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
