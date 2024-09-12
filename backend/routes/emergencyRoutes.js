const {
  getEmergencies,
  getEmergency,
  reportEmergency,
  updateEmergencyStatus,
} = require("../controllers/emergencyController");

const router = require("express").Router();

// Report emergency
router.post("/emergencies", reportEmergency);

// Get emergencies
router.get("/emergencies", getEmergencies);

// Get an emergency
router.get("/emergencies/:id", getEmergency);

// Update Emergency Status
router.put("/emergencies", updateEmergencyStatus);

module.exports = router;
