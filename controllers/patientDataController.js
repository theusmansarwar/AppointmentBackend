
const PatientData = require("../Models/patientData");

/**
 * ➕ Create (Add) a new PatientData record
 */
const createPatientData = async (req, res) => {
  const {
    name,
    age,
    gender,
    phone,
    
    address,
    appointmentDate,
    appointmentTime,
    reason,
  } = req.body;

  
const missingFields = [];

    if (!name) missingFields.push({ field: "patientName", message: "patientName is required" });
    if (!appointmentDate) missingFields.push({ field: "appointmentDate", message: "date is required" });
     if (!appointmentTime) missingFields.push({ field: "appointmentTime", message: "time is required" });
    if (!reason) missingFields.push({ field: "reason", message: "reason is required" });
     if (!phone) missingFields.push({ field: "phone", message: "phone is required" });
    if (!address) missingFields.push({ field: "address", message: "address is required" });
     if (!gender) missingFields.push({ field: "gender", message: "gender is required" });
      if (!age) missingFields.push({ field: "age", message: "age is required" });
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        message: "Some fields are missing!",
        missingFields,
      });
    }
  try {
    const newPatient = await PatientData.create({
      name,
      age,
      gender,
      phone,
     
      address,
      appointmentDate,
      appointmentTime,
      reason,
    });

    return res.json({
      message: "PatientData record created successfully",
      data: newPatient,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

/**
 * ✏️ Update an existing PatientData record
 */
const updatePatientData = async (req, res) => {
  const { id } = req.params; // ID from URL
  const {
    name,
    age,
    gender,
    phone,
    
    address,
    appointmentDate,
      appointmentTime,
    reason,
  } = req.body;

  if (!id) return res.json({ error: "Patient ID is required" });

  try {
    const updatedPatient = await PatientData.findByIdAndUpdate(
      id,
      {
       name,
        age,
        gender,
        phone,
       
        address,
       appointmentDate,
      appointmentTime,
        reason,
      },
      { new: true }
    );

    if (!updatedPatient) return res.json({ error: "Patient not found" });

    return res.json({
      message: "PatientData record updated successfully",
      data: updatedPatient,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const deletePatientData = async (req, res) => {
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

    const result = await PatientData.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} patients deleted`
    });
  } catch (error) {
    console.error("Error deleting patients:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
/**
 * 📄 Get All Patients
 */
const getAllPatients = async (req, res) => {
  try {
    const patients = await PatientData.find().sort({ createdAt: -1 });
    return res.json({
      message: "All PatientData  fetched successfully",
      data: patients,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};


const getPatientById = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    // Apply search filter
    const filter = search
     
? {
          $or: [
            { name: { $regex: search, $options: "i" } },   // if Record has patient name
            // { appointmentDate: { $regex: search, $options: "i" } }, // if Record has reason/notes
          ],
        }
      : {};
    const totalPatient = await PatientData.countDocuments(filter);

    const patient = await PatientData.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.status(200).json({
      totalPatient,
      totalPages: Math.ceil(totalPatient / limit),
      currentPage: page,
      limit,
      patient,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createPatientData,
  updatePatientData,
  deletePatientData,
  getAllPatients,
  getPatientById,
};
