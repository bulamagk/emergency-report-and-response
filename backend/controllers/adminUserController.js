const AdminUser = require("../models/AdminUser");
const jwt = require("jsonwebtoken");

// Create AdminUser*****************************************************************
const createUser = async (req, res) => {
  const { surname, othername, email, password, phone } = req.body;

  if (!(surname && othername && email && password && phone)) {
    return res.status(400).json({ message: "Please enter all fields." });
  }

  try {
    // Check email
    const emailExist = await AdminUser.findOne({ email });
    if (emailExist) {
      return res
        .status(409)
        .json({ message: `User with email [${email}] already exist!` });
    }

    // Check phone
    const phoneExist = await AdminUser.findOne({ phone });
    if (phoneExist) {
      return res
        .status(409)
        .json({ message: `User with phone number [${phone}] already exist!` });
    }

    // Create user
    const user = await AdminUser.create({
      surname,
      othername,
      email,
      password,
      phone,
    });

    const createdUser = {
      surname: user.surname,
      othername: user.othername,
      email: user.email,
      phone: user.phone,
    };

    return res.status(201).json(createdUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};

// Get Users*******************************************************************
const getUsers = async (req, res) => {
  try {
    const users = await AdminUser.find({}, { password: 0 }).sort({
      createdAt: -1,
    });
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
    const user = await AdminUser.findById(id).select("-password");
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
  const { email, phone } = req.body;
  const { id } = req.params;
  try {
    // Check email
    const emailExist = await AdminUser.findOne({ email });
    if (emailExist._id != id) {
      return res
        .status(409)
        .json({ message: `User with email [${email}] already exist!` });
    }

    // Check phone
    const phoneExist = await AdminUser.findOne({ phone });
    if (phoneExist._id != id) {
      return res
        .status(409)
        .json({ message: `User with phone number [${phone}] already exist!` });
    }

    const user = await AdminUser.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Update user
    const updatedUser = await AdminUser.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    const updatedUserData = {
      id,
      surname: updatedUser.surname,
      othername: updatedUser.othername,
      email: updatedUser.email,
      phone: updatedUser.phone,
    };

    return res.status(200).json(updatedUserData);
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
    const user = await AdminUser.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Delete user
    await AdminUser.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};

// Change Password Function --------------------------------------------------------------
const changePassword = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  if (!(password && newPassword)) {
    return res.status(400).json({ message: "Enter all required fields" });
  }

  try {
    const userExist = await AdminUser.findById(id);
    if (!userExist) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (userExist && (await userExist.comparePasswords(password))) {
      // Change password
      userExist.password = newPassword;
      await userExist.save();

      return res
        .status(200)
        .json({ message: "Password changed successfully!" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Wrong old password!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// Login User Function --------------------------------------------------------------
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required!" });
  }

  try {
    const userExist = await AdminUser.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }
    if (userExist && (await userExist.comparePasswords(password))) {
      // Generate access token
      const accessToken = jwt.sign(
        { userId: userExist._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );

      // Set httpOnly Cookie
      res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production" ? true : false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });

      const user = {
        id: userExist._id,
        email: userExist.email,
        surname: userExist.surname,
        othername: userExist.othername,
        phone: userExist.phone,
      };
      return res.status(200).json(user);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Wrong email or/and password!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Logout user Function --------------------------------------------------------------
const logout = async (req, res) => {
  try {
    // Clear cookie
    res.clearCookie("jwt", { httpOnly: true, maxAge: new Date(0) });

    return res.status(200).json({
      success: true,
      message: "You are logged out successfully!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  login,
  logout,
};
