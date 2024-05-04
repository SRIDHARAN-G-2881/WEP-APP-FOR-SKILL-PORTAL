import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true // add unique constraint to email field
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
},
  { timestamps: true }
)

const usermodel = mongoose.model('hellos', userschema)
export default usermodel