require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./Utils/db");
const os = require("os");
// Routers
const authRouter = require("./Routes/authRouter");
const patientDataRouter = require("./Routes/patientDataRouter");
const recordRouter = require("./Routes/recordRouter");
const dailyreportRouter = require("./Routes/dailyreportRouter");
const appointmentRouter = require("./Routes/appointmentRouter");
const recordvisitRoutes = require("./Routes/recordvisitRoutes");
const User= require ("./Routes/UserRoutes");
const Roles= require ("./Routes/RoleRoutes")
const app = express();

app.use(cors());
app.use(express.json());

// Routers
app.use("/patients", patientDataRouter);
app.use("/auth", authRouter);
app.use("/record", recordRouter);
app.use("/appointment", appointmentRouter);
app.use("/report", dailyreportRouter);
app.use("/records", recordvisitRoutes);
app.use("/roles", Roles);
app.use("/user", User);
// Bulk delete routes
app.delete("/patients/delete", async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ success: false, message: "ids must be array" });

  try {
    await PatientData.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Patient deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/report/delete", async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ success: false, message: "ids must be array" });

  try {
    await DailyReport.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Report deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/appointment/delete", async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ success: false, message: "ids must be array" });

  try {
    await Appointment.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/record/delete", async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ success: false, message: "ids must be array" });

  try {
    await Record.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Record deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// View routes
app.get("/patients/view", async (req, res) => {
  let { search = "", page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const filter = search ? { name: { $regex: search, $options: "i" } } : {};
  const total = await PatientData.countDocuments(filter);

  const patients = await PatientData.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json({ patients, total, page, pages: Math.ceil(total / limit) });
});

app.get("/record/view", async (req, res) => {
  let { search = "", page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const filter = search ? { patientName: { $regex: search, $options: "i" } } : {};
  const total = await Record.countDocuments(filter);

  const record = await Record.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json({ record, total, page, pages: Math.ceil(total / limit) });
});

app.get("/appointment/view", async (req, res) => {
  let { search = "", page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const filter = search ? { patientName: { $regex: search, $options: "i" } } : {};
  const total = await Appointment.countDocuments(filter);

  const appointment = await Appointment.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json({ appointment, total, page, pages: Math.ceil(total / limit) });
});

app.get("/report/view", async (req, res) => {
  let { search = "", page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const filter = search ? { reportDate: { $regex: search, $options: "i" } } : {};
  const total = await Report.countDocuments(filter);

  const report = await Report.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json({ report, total, page, pages: Math.ceil(total / limit) });
});

// Start server
const port = 5007;

const getLocalIP = () => {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal (127.0.0.1) and non-IPv4 addresses
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
};

// connectDb()
//   .then(() => {
//     app.listen(port, "0.0.0.0", () => {
//       const localIP = getLocalIP();
//       console.log(`🚀 Server running successfully!`);
//       console.log(`➡ Local:   http://127.0.0.1:${port}`);
//       console.log(`➡ Network: http://${localIP}:${port}`);
//     });
//   })
//   .catch((err) => console.error("❌ MongoDB connection failed:", err));
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
  });
});