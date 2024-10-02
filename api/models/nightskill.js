import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:false,
        unique:false,
    },
    dept:{
        type:String,
        required:false,
        unique:false,
    },
    skill:{
        type:String,
        required:false,
        unique:false,
    }

},
{timestamps:true}
)
const nightskillusermodel=mongoose.model('nightskills',userschema);
export default nightskillusermodel;