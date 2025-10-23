const express = require("express");
const router = express.Router();
const { createPatientData 
     , updatePatientData,
  deletePatientData,
   getAllPatients,
  getPatientById} = require("../controllers/patientDataController");

// route to create patient record
router.post("/create", createPatientData);
router.put("/update/:id", updatePatientData);
router.delete("/delete", deletePatientData);
router.get("/", getAllPatients);
router.get("/view", getPatientById);

module.exports = router;
