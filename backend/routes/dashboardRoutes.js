const {
  getDashboardGrid,
  getDashboardChart,
} = require("../controllers/dashboarbController");

const router = require("express").Router();

// Dashboard stats
router.get("/dashboard-grid", getDashboardGrid);
router.get("/dashboard-chart", getDashboardChart);

module.exports = router;
