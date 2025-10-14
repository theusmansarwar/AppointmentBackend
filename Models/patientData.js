const mongoose = require("mongoose");

const PatientDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  phone: { type: String, required: true },
  
  address: { type: String, required: true },
 
   appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  reason: { type: String, required: true },
 
}, { timestamps: true });

// module.exports = mongoose.model("PatientData", PatientDataSchema);
module.exports =
  mongoose.models.PatientData || mongoose.model("PatientData", PatientDataSchema);