const {
  getEmergencies,
  getEmergency,
  reportEmergency,
} = require("../controllers/emergencyController");

const router = require("express").Router();

// Report emergency
router.post("/emergencies", reportEmergency);

// Get emergencies
router.get("/emergencies", getEmergencies);

// Get an emergency
router.get("/emergencies/:id", getEmergency);

module.exports = router;
