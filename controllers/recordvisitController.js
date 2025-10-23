
const Record = require("../Models/Record");

// Get all visits for a record
const getRecordVisits = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id);

    if (!record) return res.status(404).json({ error: "Record not found" });

    res.status(200).json({ visits: record.visits || [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new visit
const createRecordVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const { visitDate, visitTime, reason, prescriptions, dues } = req.body;

    const record = await Record.findById(id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    const newVisit = { visitDate, visitTime, reason, prescriptions: prescriptions || [], dues };
    record.visits.push(newVisit);
    await record.save();

    res.status(201).json({ message: "Visit added successfully", visit: newVisit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a visit
const deleteRecordVisit = async (req, res) => {
  try {
    const { id, visitId } = req.params;

    const record = await Record.findById(id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    record.visits = record.visits.filter((v) => v._id.toString() !== visitId);
    await record.save();

    res.status(200).json({ message: "Visit deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ Update an existing visit
const updateRecordVisit = async (req, res) => {
  try {
    const { id, visitId } = req.params;
    const { visitDate, visitTime, reason, prescriptions, dues } = req.body;

    const record = await Record.findById(id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    const visit = record.visits.id(visitId);
    if (!visit) return res.status(404).json({ error: "Visit not found" });

    // Update visit fields
    if (visitDate) visit.visitDate = visitDate;
    if (visitTime) visit.visitTime = visitTime;
    if (reason) visit.reason = reason;
    if (prescriptions) visit.prescriptions = prescriptions;
    if (dues !== undefined) visit.dues = dues;

    await record.save();

    res.status(200).json({ message: "Visit updated successfully", visit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getRecordVisits,
  createRecordVisit,
  deleteRecordVisit,
  updateRecordVisit,
};
