const Emergency = require("../models/EmergencyReport");
const AdminUser = require("../models/AdminUser");

// Dashboard Grid
const getDashboardGrid = async (req, res) => {
  try {
    //  Get pending and resolved emergencies count
    const pendingEmergencies = await Emergency.find({
      status: "Pending",
    }).countDocuments();
    const resolvedEmergencies = await Emergency.find({
      status: "Resolved",
    }).countDocuments();

    // Get staff count
    const staff = await AdminUser.countDocuments();

    return res
      .status(200)
      .json({ pendingEmergencies, resolvedEmergencies, staff });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};

// Dahboard Chart
const getDashboardChart = async (req, res) => {
  try {
    //  Get pending emergencies count
    const pendingEmergencies = await Emergency.find({
      status: "Pending",
    }).countDocuments();

    // Resolved Emergencies
    const resolvedEmergencies = await Emergency.find({
      status: "Resolved",
    }).countDocuments();

    // Dispatch Emergencies
    const dispatchedEmergencies = await Emergency.find({
      status: "Dispatched",
    }).countDocuments();

    return res.status(200).json({
      pieChart: {
        pendingEmergencies,
        resolvedEmergencies,
        dispatchedEmergencies,
      },
      barChart: {},
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occured \n\n ${error.message}` });
  }
};

module.exports = {
  getDashboardGrid,
  getDashboardChart,
};
