// models/DailyReport.js
const mongoose = require("mongoose");

const dailyReportSchema = new mongoose.Schema(
  {
    reportDate: {
      type: Date,
      required: true,
    },
    totalAppointments: {
      type: Number,
      default: 0,
    },
    patientsSeen: {
      type: Number,
      default: 0,
    },
    cancelled: {
      type: Number,
      default: 0,
    },
    noShow: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    prescriptionsGiven: {
      type: Number,
      default: 0,
    },
    commonDiseases: [
      {
        type: String, // array of disease names
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyReport", dailyReportSchema);
