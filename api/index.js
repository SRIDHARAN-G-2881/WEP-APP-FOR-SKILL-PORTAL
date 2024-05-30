import express from "express";

import mongoose from "mongoose";
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
import bodyParser from "body-parser"; // Import body-parser
import router from './routes/userroutes.js';
import UserModel from './models/usermodel.js';
import cors from 'cors'
import usermodel from "./models/usermodel.js";
const app=express();
const secret="sridharan"
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const jwt_code="skill";

app.use(express.json());
app.post('/api/auth/google', async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  console.log('Received request:', req.body); 


  try {
    const user = await usermodel.findOne({ email });
    console.log('User found:', user); // Log found user

    if (user) {
      const token = jwt.sign({ id: user._id,isadmin:user.isadmin }, jwt_code);
      const { password, ...rest } = user._doc;
      return res.status(200).cookie('access_token', token, {
        httpOnly: true,
      }).json({...rest,isadmin:user.isadmin});
    } else {
      const randomPassword = Math.random().toString(36).slice(-8);
      const newUser = new usermodel({
        username: `${name.toLowerCase().split(' ').join('')}${Math.random().toString(9).slice(-4)}`,
        email,
        password: randomPassword,
        profilePicture: googlePhotoUrl,
        isadmin,
      });
      await newUser.save();
      console.log('New user created:', newUser); // Log created user

      const token = jwt.sign({ id: newUser._id ,isadmin:newUser.isadmin}, jwt_code);
      const { password, ...rest } = newUser._doc;
      return res.status(200).cookie('access_token', token, {
        httpOnly: true,
      }).json({...rest,isadmin:newUser.isadmin});
    }
  } catch (error) {
    console.error('Error during authentication:', error); // Log the error for debugging
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
app.post('/api/signout',async (req,res)=>{
    try{
      res.clearCookie('access_token').status(200).json('user has been signed out');
    }
    catch(error){
      console.log(error.message);
    }
})
app.post('/api/signup',async (req,res)=>{
  try{
  const {name,email,password}=req.body;
  const user=new usermodel({
    username:name,
    email,
    password
  })
  await user.save()
   return res.status(200);


}
  catch(error){
    console.log(error.message);
  }
})

mongoose.connect('mongodb://localhost:27017/mernstack1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

