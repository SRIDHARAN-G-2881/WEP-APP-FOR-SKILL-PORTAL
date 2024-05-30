import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: true
  },
  email: {
    type: String,
    required: false,
    unique: true // add unique constraint to email field
  },
  password: {
    type: String,
    required: false,
    unique: false
  },
  profilepicture:{
    type:String,
    required:false,
    default:"https://tse1.mm.bing.net/th?id=OIP.8li1g3WASRlQCpV6X54VCQHaHa&pid=Api&P=0&h=180",
  },
  isadmin:{
    type:Boolean,
    default:false,
  },
},
  { timestamps: true }
)

const usermodel = mongoose.model('hellos', userschema)
export default usermodel