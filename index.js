require ("dotenv").config();
const express=require("express")
const app=express();
const patientDataController=require('./Controller/patientDataController')
const connectDb =require('./Utils/db')
const authRouter = require("./Routes/authRouter");
const patientDataRouter=require('./Routes/patientDataRouter')
const recordRouter = require ('./Routes/recordRouter')
const dailyreportRouter = require ('./Routes/dailyreportRouter')
const appointmentRouter = require ('./Routes/appointmentRouter')


const cors = require("cors");

app.use(cors());

app.use(express.json())
app.use('/patients',patientDataRouter)
app.use("/api/auth", authRouter);
app.use('/record' , recordRouter )
app.use('/appointment' , appointmentRouter )
app.use('/report' , dailyreportRouter )

app.delete("/patients/delete", async (req, res) => {
  const { ids } = req.body; // ✅ receives array
  if (!Array.isArray(ids)) {
    return res.status(400).json({ success: false, message: "ids must be array" });
  }

  try {
    await PatientData.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Patient deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.delete("/report/delete", async (req, res) => {
  const { ids } = req.body; // ✅ receives array
  if (!Array.isArray(ids)) {
    return res.status(400).json({ success: false, message: "ids must be array" });
  }

  try {
    await DailyReport.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Report deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.delete("/appointment/delete", async (req, res) => {
  const { ids } = req.body; // ✅ receives array
  if (!Array.isArray(ids)) {
    return res.status(400).json({ success: false, message: "ids must be array" });
  }

  try {
    await Appointment.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.delete("/record/delete", async (req, res) => {
  const { ids } = req.body; // ✅ receives array
  if (!Array.isArray(ids)) {
    return res.status(400).json({ success: false, message: "ids must be array" });
  }

  try {
    await Record.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Record deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
 
port=5000;
connectDb().then(()=>{
app.listen(port,()=>{
    console.log("server is runnig port",port)
})

})