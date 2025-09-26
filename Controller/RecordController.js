// const Record = require("../Models/Record");


// const createRecord = async (req, res) => {
//   const {
//     patientName,
//     appointmentDate,
//     appointmentTime,
//     reason,
//     prescription,
//     dues,
    
//   } = req.body;

//   // basic validation
//   if (!patientName) return res.status(400).json({ error: "Patient Name is required" });
//   if (!appointmentDate) return res.status(400).json({ error: "Date is required" });
//   if (!appointmentTime) return res.status(400).json({ error: "Time is required" });
//   if (!reason) return res.status(400).json({ error: "Reason is required" });
//   if (!prescription) return res.status(400).json({ error: "Prescription is required" });
//   if (dues === undefined) return res.status(400).json({ error: "Dues is required" });

//   try {
//     const newRecord = await Record.create({
//       patientName,
//       appointmentDate,
//       appointmentTime,
//       reason,
//       prescription,
//       dues,
//        // ✅ now included
//     });

//     return res.status(201).json({
//       message: "Record created successfully",
//       data: newRecord,
//     });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

// // 🔄 Update a record
// const updateRecord = async (req, res) => {
//   const { id } = req.params;
//   const { patientName, appointmentDate, appointmentTime, reason, prescription, dues } =
//     req.body;

//   if (!id) {
//     return res.json({ error: "Record ID is required" });
//   }

//   try {
//     const updatedRecord = await Record.findByIdAndUpdate(
//       id,
//       {
//         patientName,
//         appointmentDate,
//         appointmentTime,
//         reason,
//         prescription,
//         dues,
      
//       },
//       { new: true }
//     );

//     if (!updatedRecord) {
//       return res.json({ error: "Record not found" });
//     }

//     return res.json({
//       message: "Record updated successfully",
//       data: updatedRecord,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };

// // 🗑️ Delete a record
// // const deleteRecord = async (req, res) => {
// //   const { id } = req.params;

// //   if (!id) {
// //     return res.json({ error: "Record ID is required" });
// //   }

// //   try {
// //     const deletedRecord = await Record.findByIdAndDelete(id);

// //     if (!deletedRecord) {
// //       return res.json({ error: "Record not found" });
// //     }

// //     return res.json({
// //       message: "Record deleted successfully",
// //       data: deletedRecord,
// //     });
// //   } catch (err) {
// //     return res.json({ error: err.message });
// //   }
// // };
// const deleteRecord = async (req, res) => {
//   try {
//     const { ids } = req.body;

//     // Validate input
//     if (!Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "ids must be array"
//       });
//     }

//     console.log("Deleting records with ids:", ids);

//     const result = await Record.deleteMany({ _id: { $in: ids } });

//     return res.status(200).json({
//       success: true,
//       message: `${result.deletedCount} record deleted`
//     });
//   } catch (error) {
//     console.error("Error deleting records:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// // 📄 Get all records
// // const getAllRecords = async (req, res) => {
// //   try {
// //     const records = await Record.find().sort({ createdAt: -1 });
// //     return res.json({
// //       message: "All records fetched successfully",
// //       data: records,
// //     });
// //   } catch (err) {
// //     return res.json({ error: err.message });
// //   }
// // };
// const getAllRecords = async (req, res) => {
//   try {
//     const record = await Record.find().sort({ createdAt: -1 });
//     return res.json({
//       message: "All Records fetched successfully",
//       data: record,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };
// // 🔍 Get a single record by ID
// const getRecordById = async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.json({ error: "Record ID is required" });
//   }

//   try {
//     const record = await Record.findById(id);

//     if (!record) {
//       return res.json({ error: "Record not found" });
//     }

//     return res.json({
//       message: "Record fetched successfully",
//       data: record,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };

// module.exports = {
//   createRecord,
//   updateRecord,
//   deleteRecord,
//   getAllRecords,
//   getRecordById,
// };
// controllers/recordController.js
const Record = require("../Models/Record");

const createRecord = async (req , res) => {
  const { patientName, appointmentDate, appointmentTime, reason, prescription, dues } = req.body;
   console.log("Data in req::", req.body)

    const missingFields = [];

    if (!patientName) missingFields.push({ field: "patientName", message: "patientName is required" });
    if (!appointmentDate) missingFields.push({ field: "appointmentDate", message: "appointmentDate is required" });
     if (!appointmentTime) missingFields.push({ field: "appointmentTime", message: "appointmentTime is required" });
    if (!reason) missingFields.push({ field: "reason", message: "reason is required" });
     if (!prescription) missingFields.push({ field: "prescription", message: "prescription is required" });
    if (!dues) missingFields.push({ field: "dues", message: "dues is required" });

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        message: "Some fields are missing!",
        missingFields,
      });
    }


  try {
    const newRecord = await Record.create({
      patientName,
      appointmentDate,
      appointmentTime,
      reason,
      prescription,
      dues,
    });

    return res.status(201).json({
      message: "Record created successfully",
      data: newRecord,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateRecord = async (req, res) => {
  const { id } = req.params;
  const { patientName, appointmentDate, appointmentTime, reason, prescription, dues } = req.body;

  if (!id) return res.json({ error: "Record ID is required" });

  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      {
        patientName,
        appointmentDate,
        appointmentTime,
        reason,
        prescription,
        dues,
      },
      { new: true }
    );

    if (!updatedRecord) return res.json({ error: "Record not found" });

    return res.json({
      message: "Record updated successfully",
      data: updatedRecord,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    return res.json({
      message: "All records fetched successfully",
      data: records,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const getRecordById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.json({ error: "Record ID is required" });

  try {
    const record = await Record.findById(id);
    if (!record) return res.json({ error: "Record not found" });

    return res.json({
      message: "Record fetched successfully",
      data: record,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({ success: false, message: "ids must be array" });

    const result = await Record.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} record deleted`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createRecord,
  updateRecord,
  getAllRecords,
  getRecordById,
  deleteRecord,
};
