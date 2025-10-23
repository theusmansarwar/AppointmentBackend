
const express = require("express");
const router = express.Router();

// import all controller functions
const {
  createDailyReport,
  updateDailyReport,
  deleteDailyReport,
  getAllDailyReports,
  getDailyReportById,
} = require('../controllers/dailyreportController')

// ➕ Create Daily Report
router.post("/create", createDailyReport);

// 🔄 Update Daily Report
router.put("/update/:id", updateDailyReport);

// 🗑️ Delete Daily Report
router.delete("/delete", deleteDailyReport);

// 📄 Get All Daily Reports
router.get("/", getAllDailyReports);

// 🔍 Get Single Daily Report by ID
router.get("/view", getDailyReportById);

module.exports = router;
