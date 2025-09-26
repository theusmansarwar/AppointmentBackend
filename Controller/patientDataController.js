// const PatientData = require("../Models/patientData");

// // ➕ Create (Add) a new PatientData record
// const createPatientData = async (req, res) => {
//   const {
//     full_name,
//     age,
//     gender,
//     phone,
//     email,
//     address,
    
//     date_of_visit,
//     time_of_visit,
//     reason_for_visit,
   
//   } = req.body;

//   // basic validation
//   if (!full_name) {
//     return res.json({ error: "Full name is required" });
//   }
//   if (!age) {
//     return res.json({ error: "Age is required" });
//   }
//   if (!gender) {
//     return res.json({ error: "Gender is required" });
//   }
//   if (!phone) {
//     return res.json({ error: "Phone number is required" });
//   }
//   if (!address) {
//     return res.json({ error: "Address is required" });
//   }
//   if (!date_of_visit) {
//     return res.json({ error: "Date of visit is required" });
//   }
//   if (!time_of_visit) {
//     return res.json({ error: "Time of visit is required" });
//   }
//   if (!reason_for_visit) {
//     return res.json({ error: "Reason for visit is required" });
//   }

//   // Save to MongoDB
//   try {
//     const newPatient = await PatientData.create({
//       full_name,
//       age,
//       gender,
//       phone,
//       email,
//       address,
      
//       date_of_visit,
//       time_of_visit,
//       reason_for_visit,

//     });

//     return res.json({
//       message: "PatientData record created successfully",
//       data: newPatient,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };

// module.exports = { createPatientData };

// const updatePatientData = async (req, res) => {
//   const { id } = req.params; // ID from URL
//   const {
//     full_name,
//     age,
//     gender,
//     phone,
//     email,
//     address,
    
//     date_of_visit,
//     time_of_visit,
//     reason_for_visit,

//   } = req.body;

//   // Basic validation — at least one field to update
//   if (!id) {
//     return res.json({ error: "Patient ID is required" });
//   }

//   try {
//     // Find by ID and update
//     const updatedPatient = await PatientData.findByIdAndUpdate(
//       id,
//       {
//         full_name,
//         age,
//         gender,
//         phone,
//         email,
//         address,
        
//         date_of_visit,
//         time_of_visit,
//         reason_for_visit,

//       },
//       { new: true } // return updated doc
//     );

//     if (!updatedPatient) {
//       return res.json({ error: "Patient not found" });
//     }

//     return res.json({
//       message: "PatientData record updated successfully",
//       data: updatedPatient,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };

// module.exports = { updatePatientData };



// // 🗑️ Delete PatientData record
// const deletePatientData = async (req, res) => {
//   const { id } = req.params; // ID from URL

//   if (!id) {
//     return res.json({ error: "Patient ID is required" });
//   }

//   try {
//     const deletedPatient = await PatientData.findByIdAndDelete(id);

//     if (!deletedPatient) {
//       return res.json({ error: "Patient not found" });
//     }

//     return res.json({
//       message: "PatientData record deleted successfully",
//       data: deletedPatient,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };

// module.exports = { deletePatientData };


// const getAllPatients = async (req, res) => {
//   try {
//     const patients = await PatientData.find().sort({ createdAt: -1 }); // latest first
//     return res.json({
//       message: "All PatientData records fetched successfully",
//       data: patients,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };

// // 🔍 Get a single patient record by ID
// const getPatientById = async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.json({ error: "Patient ID is required" });
//   }

//   try {
//     const patient = await PatientData.findById(id);

//     if (!patient) {
//       return res.json({ error: "Patient not found" });
//     }

//     return res.json({
//       message: "PatientData record fetched successfully",
//       data: patient,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };

// module.exports = {
//   getAllPatients,
//   getPatientById,
// };
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
    date,
    time,
    reason,
  } = req.body;

  // basic validation
  // if (!name) return res.json({ error: "Full name is required" });
  // if (!age) return res.json({ error: "Age is required" });
  // if (!gender) return res.json({ error: "Gender is required" });
  // if (!phone) return res.json({ error: "Phone number is required" });
  // if (!address) return res.json({ error: "Address is required" });
  // if (!date) return res.json({ error: "Date of visit is required" });
  // if (!time) return res.json({ error: "Time of visit is required" });
  // if (!reason) return res.json({ error: "Reason for visit is required" });
const missingFields = [];

    if (!name) missingFields.push({ field: "patientName", message: "patientName is required" });
    if (!date) missingFields.push({ field: "date", message: "date is required" });
     if (!time) missingFields.push({ field: "appointmentTime", message: "time is required" });
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
      date,
      time,
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
    date,
    time,
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
        date,
        time,
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

/**
 * 🗑️ Delete PatientData record
 */
// const deletePatientData = async (req, res) => {
//   const { id } = req.params;

//   if (!id) return res.json({ error: "Patient ID is required" });

//   try {
//     const deletedPatient = await PatientData.findByIdAndDelete(id);

//     if (!deletedPatient) return res.json({ error: "Patient not found" });

//     return res.json({
//       message: "PatientData record deleted successfully",
//       data: deletedPatient,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };
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

    const result = await Patient.deleteMany({ _id: { $in: ids } });

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

/**
 * 🔍 Get Patient By ID
 */
const getPatientById = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.json({ error: "Patient ID is required" });

  try {
    const patient = await PatientData.findById(id);

    if (!patient) return res.json({ error: "Patient not found" });

    return res.json({
      message: "PatientData record fetched successfully",
      data: patient,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

/**
 * ✅ Export all controllers at once
 */
module.exports = {
  createPatientData,
  updatePatientData,
  deletePatientData,
  getAllPatients,
  getPatientById,
};
