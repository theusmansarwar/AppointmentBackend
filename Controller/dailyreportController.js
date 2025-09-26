const DailyReport = require("../Models/DailyReport"); // your DailyReport model

// ➕ Create (Add) a new DailyReport record
const createDailyReport = async (req, res) => {
  const {
    reportDate,
    totalAppointments,
    patientsSeen,
    cancelled,
    noShow,
    totalRevenue,
    prescriptionsGiven,
    commonDiseases,
  } = req.body;

  // basic validation
  // if (!reportDate) {
  //   return res.json({ error: "Date is required" });
  // }
  // if (totalAppointments === undefined) {
  //   return res.json({ error: "Total Appointments is required" });
  // }
  // if (patientsSeen === undefined) {
  //   return res.json({ error: "Patients Seen is required" });
  // }
  
    const missingFields = [];

    if (!patientsSeen) missingFields.push({ field: "patientsSeen", message: "patientsSeen is required" });
    if (!reportDate) missingFields.push({ field: "reporttDate", message: "reportDate is required" });
     if (!totalAppointments) missingFields.push({ field: "totalAppointments", message: "totalAppointments is required" });
    if (!cancelled) missingFields.push({ field: "cancelled", message: "cancelled is required" });
     if (!prescriptionsGiven) missingFields.push({ field: "prescriptionsGiven", message: "prescriptionsGiven is required" });
    if (!noShow) missingFields.push({ field: "noShow", message: "noShow is required" });
    if (!totalRevenue) missingFields.push({ field: "totalRevenue", message: "totalRevenue is required" });
    if (!commonDiseases) missingFields.push({ field: "commonDiseases", message: "commonDiseases is required" });

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        message: "Some fields are missing!",
        missingFields,
      });
    }
  try {
    // Save to MongoDB
    const newReport = await DailyReport.create({
      reportDate,
      totalAppointments,
      patientsSeen,
      cancelled,
      noShow,
      totalRevenue,
      prescriptionsGiven,
      commonDiseases,
    });

    return res.json({
      message: "DailyReport record created successfully",
      data: newReport,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

// 🔄 Update DailyReport record
const updateDailyReport = async (req, res) => {
  const { id } = req.params; // ID from URL
  const {
     reportDate,
      totalAppointments,
      patientsSeen,
      cancelled,
      noShow,
      totalRevenue,
      prescriptionsGiven,
      commonDiseases,
  } = req.body;

  if (!id) {
    return res.json({ error: "DailyReport ID is required" });
  }

  try {
    const updatedReport = await DailyReport.findByIdAndUpdate(
      id,
      {
        reportDate,
      totalAppointments,
      patientsSeen,
      cancelled,
      noShow,
      totalRevenue,
      prescriptionsGiven,
      commonDiseases,
      },
      { new: true } // return updated doc
    );

    if (!updatedReport) {
      return res.json({ error: "DailyReport not found" });
    }

    return res.json({
      message: "DailyReport record updated successfully",
      data: updatedReport,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

// 🗑️ Delete DailyReport record
// const deleteDailyReport = async (req, res) => {
//   const { id } = req.params; // ID from URL

//   if (!id) {
//     return res.json({ error: "DailyReport ID is required" });
//   }

//   try {
//     const deletedReport = await DailyReport.findByIdAndDelete(id);

//     if (!deletedReport) {
//       return res.json({ error: "DailyReport not found" });
//     }

//     return res.json({
//       message: "DailyReport record deleted successfully",
//       data: deletedReport,
//     });
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };
//  catch (err) {
//     return res.json({ error: err.message });
//   }
// };
const deleteDailyReport = async (req, res) => {
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

    const result = await DailyReport.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} reports deleted`
    });
  } catch (error) {
    console.error("Error deleting reports:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// 📄 Get all DailyReports
const getAllDailyReports = async (req, res) => {
  try {
    const reports = await DailyReport.find().sort({ date: -1 }); // latest first
    return res.json({
      message: "All DailyReport records fetched successfully",
      data: reports,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

// 🔍 Get a single DailyReport record by ID
const getDailyReportById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ error: "DailyReport ID is required" });
  }

  try {
    const report = await Report.findById(id);

    if (!report) {
      return res.json({ error: "DailyReport not found" });
    }

    return res.json({
      message: "DailyReport record fetched successfully",
      data: report,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

module.exports = {
  createDailyReport,
  updateDailyReport,
  deleteDailyReport,
  getAllDailyReports,
  getDailyReportById,
};
