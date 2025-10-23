
const Record = require("../Models/Record");

// Create Record
const createRecord = async (req, res) => {
  const { patientName, appointmentDate, appointmentTime, reason, prescription, dues } = req.body;
  console.log("Data in req::", req.body);

  const missingFields = [];
  if (!patientName) missingFields.push({ field: "patientName", message: "patientName is required" });
  if (!appointmentDate) missingFields.push({ field: "appointmentDate", message: "appointmentDate is required" });
  if (!appointmentTime) missingFields.push({ field: "appointmentTime", message: "appointmentTime is required" });
  if (!reason) missingFields.push({ field: "reason", message: "reason is required" });
  if (!prescription) missingFields.push({ field: "prescription", message: "prescription is required" });
  if (dues === undefined) missingFields.push({ field: "dues", message: "dues is required" });

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

// Update Record
const updateRecord = async (req, res) => {
  const { id } = req.params;
  const { patientName, appointmentDate, appointmentTime, reason, prescription, dues } = req.body;

  if (!id) return res.json({ error: "Record ID is required" });

  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      { patientName, appointmentDate, appointmentTime, reason, prescription, dues },
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

// Get all records (with pagination + search)
const getRecords = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const filter = search
      ? {
          $or: [
            { patientName: { $regex: search, $options: "i" } },
            // { appointmentDate: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const totalRecord = await Record.countDocuments(filter);

    const records = await Record.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.status(200).json({
      totalRecord,
      totalPages: Math.ceil(totalRecord / limit),
      currentPage: page,
      limit,
      records,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single record by ID
const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete records
const deleteRecord = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "ids must be array" });
    }

    const result = await Record.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} record(s) deleted`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createRecord,
  updateRecord,
  getRecords,      // ✅ renamed cleanly for list + pagination
  getRecordById,   // ✅ single record fetch
  deleteRecord,
};
