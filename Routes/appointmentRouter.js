const express = require("express");
const router = express.Router();
const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
} = require("../Controller/appointmentController");

router.post("/create", createAppointment);
router.put("/update/:id", updateAppointment);
router.delete("/delete", deleteAppointment);
router.get("/all", getAllAppointments);
router.get("/get/:id", getAppointmentById);

module.exports = router;
