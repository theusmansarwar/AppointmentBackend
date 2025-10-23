const express = require("express");
const {
  getRecordVisits,
  createRecordVisit,
  deleteRecordVisit,
  updateRecordVisit,
} = require("../controllers/recordvisitController");

const router = express.Router();

// GET all visits for a record
router.get("/:id/visits", getRecordVisits);

// POST create a visit
router.post("/:id/visits", createRecordVisit);

// DELETE a visit
router.delete("/:id/visits/:visitId", deleteRecordVisit);

router.put("/:id/visits/:visitId", updateRecordVisit);

module.exports = router;
