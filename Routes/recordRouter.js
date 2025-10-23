// // routes/recordRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   createRecord,
//   updateRecord,
//   deleteRecord,
//   getAllRecords,
//   getRecordById,
//   getRecordByById,
// } = require("../Controller/RecordController");


// router.post("/create", createRecord);


// router.get("/", getAllRecords);
// router.get("/:id", getRecordByById);

// router.get("/view", getRecordById);

// router.put("/update/:id", updateRecord);

// router.delete("/delete", deleteRecord);

// module.exports = router;
const express = require("express");
const {
  createRecord,
  updateRecord,
  getRecords,     // ✅ list with pagination + search
  getRecordById,  // ✅ single record
  deleteRecord,
} = require("../controllers/RecordController");

const router = express.Router();

// Create new record
router.post("/create", createRecord);

// Update record by ID
router.put("update/:id", updateRecord);

// Get all records (paginated + search)
router.get("/view", getRecords);

// Get a single record by ID
router.get("/:id", getRecordById);

// Delete multiple records
router.delete("/delete", deleteRecord);

module.exports = router;
