import mongoose from "mongoose";
const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false,
    },
    skill:{
        type:String,
        required:true,
        unique:false,
    },
    lab:{
        type:String,
        required:true,
        unique:false,
    }

},
{timestamps:true}
)
const assignstaffusermodel=mongoose.model('assignstaffusermodels',userschema);
export default assignstaffusermodel;

