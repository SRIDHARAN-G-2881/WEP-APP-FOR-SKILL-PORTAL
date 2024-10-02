import mongoose from "mongoose";
const userrr = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false
    },
    status: {
        type: Boolean, // Change to Boolean
        required: true,
        unique: false
    }
}, { timestamps: true });

const attendence = mongoose.model("attendence", userrr);
export default attendence;
