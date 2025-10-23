const Appointment = require("../Models/appointment"); // adjust path to your model

// ➕ Create (Add) a new Appointment
const createAppointment = async (req, res) => {
  const {
    patientName,
    appointmentDate,
    appointmentTime,
    status,
    reason,
   
  } = req.body;

  // basic validation
//   if (!patientName) {
//     return res.json({ error: "Patient name is required" });
//   }
//   if (!appointmentDate) {
//     return res.json({ error: "Appointment date is required" });
//   }
//   if (!appointmentTime) {
//     return res.json({ error: "Appointment time is required" });
//   }
//   if (!status) {
//     return res.json({ error: "Status is required" });
//   }
// if (!reason) {
//     return res.json({ error: "Reason is required" });
//   }
  // Save to MongoDB
   const missingFields = [];

    if (!patientName) missingFields.push({ field: "patientName", message: "patientName is required" });
    if (!appointmentDate) missingFields.push({ field: "appointmentDate", message: "appointmentDate is required" });
     if (!appointmentTime) missingFields.push({ field: "appointmentTime", message: "appointmentTime is required" });
    if (!reason) missingFields.push({ field: "reason", message: "reason is required" });
     
    if (!status) missingFields.push({ field: "status", message: "status is required" });

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        message: "Some fields are missing!",
        missingFields,
      });
    }
  try {
    const newAppointment = await Appointment.create({
      patientName,
      appointmentDate,
      appointmentTime,
      status,           // optional, defaults to Pending
      reason,
      // optional
    });

    return res.json({
      message: "Appointment created successfully",
      data: newAppointment,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

// ✏️ Update Appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params;

  const {
    patientName,
    appointmentDate,
    appointmentTime,
    status,
    reason,
  
  } = req.body;

  if (!id) {
    return res.json({ error: "Appointment ID is required" });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        patientName,
        appointmentDate,
        appointmentTime,
        status,
        reason,
      
      },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.json({ error: "Appointment not found" });
    }

    return res.json({
      message: "Appointment updated successfully",
      data: updatedAppointment,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};


const deleteAppointment = async (req, res) => {
  try {
    const { ids } = req.body;

    // Validate input
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "ids must be array"
      });
    }

    console.log("Deleting patients with ids:", ids);

    const result = await Appointment.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} patients deleted`
    });
  } catch (error) {
    console.error("Error deleting patients:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// 🔍 Get all Appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      // .populate("patientId") // optional: include Patient info
      .sort({ createdAt: -1 });

    return res.json({
      message: "All Appointments fetched successfully",
      data: appointments,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

// 🔍 Get a single Appointment by ID
// const getAppointmentById = async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.json({ error: "Appointment ID is required" });
//   }

//   try {
//     const appointment = await Appointment.findById(id).populate("patientId");

//     if (!appointment) {
//       return res.json({ error: "Appointment not found" });
//     }

//     return res.json({
//       message: "Appointment fetched successfully",
//       data: appointment,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };
// ✅ View Industries with pagination
// const getAppointmentById = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     const totalAppointment = await Appointment.countDocuments();
//     const appointment = await Appointment.find()
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .skip((page - 1) * limit);

//     res.status(200).json({
//       totalAppointment,
//       totalPages: Math.ceil(totalAppointment / limit),
//       currentPage: page,
//       limit,
//       appointment,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const getAppointmentById = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    // ✅ Build filter (adjust fields based on your schema)
    const filter = search
      ? {
          $or: [
            { patientName: { $regex: search, $options: "i" } }, // search by patient name
             // search by doctor (if exists)
            { reason: { $regex: search, $options: "i" } },      // search by reason
          ],
        }
      : {};

    const totalAppointment = await Appointment.countDocuments(filter);

    const appointment = await Appointment.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.status(200).json({
      totalAppointment,
      totalPages: Math.ceil(totalAppointment / limit),
      currentPage: page,
      limit,
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
};
