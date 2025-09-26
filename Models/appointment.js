const mongoose= require ("mongoose")
const appointmentSchema =  mongoose.Schema (
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
      type: String, // You can store as 'HH:mm' or Date, depending on usage
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Completed", "Cancelled"],
      default: "Pending",
    },

    reason: {
      type: String,
      trim: true,
    },

    // Add prescription items later for invoice
    
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);