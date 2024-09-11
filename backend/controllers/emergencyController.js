const Emergency = require("../models/EmergencyReport");

// Report Emergency
const reportEmergency = async (req, res) => {
  const { user, type, description, coordinates } = req.body;

  if (!(user && type && description && coordinates)) {
    return res.status(400).json("Please enter all required fields");
  }

  try {
    const emergency = await Emergency.create({
      user,
      type,
      description,
      coordinates,
    });

    // New emergency IO notification
    const io = req.io;
    io.to("admin").emit("newEmergency", emergency);

    return res.status(200).json(emergency);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};

// Get all mergencies
const getEmergencies = async (req, res) => {
  let filter = {};
  let { status, type, user } = req.query;

  if (status) {
    filter = { status };
  }

  if (user) {
    filter = { user };
  }

  if (type) {
    filter = { type };
  }

  try {
    const emergencies = await Emergency.find(filter).populate("user");
    return res.status(200).json(emergencies);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};

// Get single emergency
const getEmergency = async (req, res) => {
  const { id } = req.params;

  try {
    const emergency = await Emergency.findById(id).populate("user");
    return res.status(200).json(emergency);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};

module.exports = {
  reportEmergency,
  getEmergencies,
  getEmergency,
};
