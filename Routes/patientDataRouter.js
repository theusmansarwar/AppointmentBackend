const express = require("express");
const router = express.Router();
const { createPatientData 
     , updatePatientData,
  deletePatientData,
   getAllPatients,
  getPatientById} = require("../Controller/patientDataController");

// route to create patient record
router.post("/create", createPatientData);
router.put("/update/:id", updatePatientData);
router.delete("/delete", deletePatientData);
router.get("/all", getAllPatients);
router.get("/get/_id", getPatientById);

module.exports = router;
