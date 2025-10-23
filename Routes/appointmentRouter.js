const express = require("express");
const router = express.Router();
const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
} = require("../controllers/appointmentController");

router.post("/create", createAppointment);
router.put("/update/:id", updateAppointment);
router.delete("/delete", deleteAppointment);
router.get("/", getAllAppointments);
router.get("/view", getAppointmentById);

module.exports = router;
