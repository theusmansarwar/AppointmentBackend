
// const mongoose = require("mongoose");
// // const PrescriptionSchema = new mongoose.Schema({
// //   medicineName: String,
// //   dosage: String,
// //   frequency: String,
// //   duration: String,
// // });

// // const visitSchema = new mongoose.Schema({
// //   visitDate: { type: Date, required: true },
// //   visitTime: { type: String, required: true },
// //   reason: { type: String, required: true },
// //     prescription: { type: String },
// //     // {
// //     //   medicineName: String,
// //     //   dosage: String,      // e.g. "500mg"
// //     //   frequency: String,   // e.g. "2 times a day"
// //     //   duration: String,    // e.g. "5 days"
// //     //   instructions: String // e.g. "After meals"
// //     // }
  
// //   dues: { type: Number, default: 0 },
// //    },
// //   { timestamps: true } 
// // );

// const PrescriptionSchema = new mongoose.Schema({
//   medicineName: String,
//   dosage: String,
//   frequency: String,
//   duration: String,
// });

// const VisitSchema = new mongoose.Schema({
//   visitDate: Date,
//   visitTime: String,
//   reason: String,
//   dues: Number,
//   prescriptions: [PrescriptionSchema],  // ✅ array of structured items
// });


// const recordSchema = new mongoose.Schema(
//   {
//     patientName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     appointmentDate: {
//       type: Date,        // ✅ uppercase D
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
//     visits: [visitSchema],
//   },
//   { timestamps: true }
// );

// // module.exports = mongoose.model("Record", recordSchema);
// module.exports =
//   mongoose.models.Record || mongoose.model("Record", recordSchema);
const mongoose = require("mongoose");

// Prescription Schema
const PrescriptionSchema = new mongoose.Schema({
  medicineName: String,
  dosage: String,
  frequency: String,
  duration: String,
});

// Visit Schema
const VisitSchema = new mongoose.Schema(
  {
    visitDate: { type: Date, required: true },
    visitTime: { type: String, required: true },
    reason: { type: String, required: true },
    dues: { type: Number, default: 0 },
    prescriptions: [PrescriptionSchema], // ✅ array of structured items
  },
  { timestamps: true }
);

// Record Schema
const recordSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    appointmentDate: {
      type: Date,
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
    visits: [VisitSchema], // ✅ FIXED name (capitalized V)
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Record || mongoose.model("Record", recordSchema);
