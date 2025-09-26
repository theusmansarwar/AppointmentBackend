// // models/Record.js
// const mongoose = require("mongoose");

// const recordSchema = new mongoose.Schema(
//   {
//     patientName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     appointmentDate: {
//       type: Date,
//       required: true,
//     },
//     appointmentTime: {
//       type: String,
//       required: true,
//     },
//     reason: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     prescription: {
//       type: String,
//       trim: true,
//     },
//     dues: {
//       type: Number,
//       default: 0,
//     },
//     // If you want to link with PatientData model
    
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Record", recordSchema);
// models/Record.js
const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    appointmentDate: {
      type: String,        // ✅ uppercase D
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    prescription: {
      type: String,
      trim: true,
    },
    dues: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);
