import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    unique: false,
  },
  dept: {
    type: String,
    required: false,
    unique: false,
  },
  skill: {
    type: String,
    required: false,
    unique: false,
  },
  attendence: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'attendence', // Reference to the attendence collection
    }
  ]
}, { timestamps: true });

const dayskillusermodel = mongoose.model('dayskill', userschema);
export default dayskillusermodel;
