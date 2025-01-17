import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // Ensures userId is required
    ref: 'User' // Make sure this references your User model
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean, 
    required: true
  },
  date: {
    type: String,  // Use a string or date type, depending on your preference
    required: true  // Ensure date is required
  }
}, { timestamps: true });

// Index to enforce uniqueness of userId and date
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
