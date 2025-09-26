// routes/recordRoutes.js
const express = require("express");
const router = express.Router();
const {
  createRecord,
  updateRecord,
  deleteRecord,
  getAllRecords,
  getRecordById,
} = require("../Controller/RecordController");


router.post("/create", createRecord);


router.get("/all", getAllRecords);


router.get("/get/:id", getRecordById);

router.put("/update/:id", updateRecord);

router.delete("/delete", deleteRecord);

module.exports = router;
