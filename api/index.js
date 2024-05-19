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

mongoose.connect("mongodb://127.0.0.1:27017/mernstack1")
 .then(() => {
    console.log("Mongo db connected");
  })
 .catch((e) => {
    console.error("Error connecting to MongoDB:", e);
  });
  app.use('/api/signin', async (req, res, next) => {
    console.log(req.body);
    const {email, password} = req.body.formdata;
    try {
      console.log({email});
      const validuser = await usermodel.findOne({email});
  
      if (!validuser) {
        console.log("Not a valid user");
        return next(errorHandler(404, 'User not found'));
      }
  
      if (password == validuser.password) {
        console.log("The user password is correct. Please try again!!");
        // Sending back a token as response
        const token = jwt.sign({id: validuser._id}, jwt_code);
        return res.status(200).json({token,email: validuser.email}); // Sending token in response
      } else {
        // If password is incorrect
        console.log("Invalid password");
        return next(errorHandler(401, 'Invalid password'));
      }
    } catch(error) {
      console.log(error.message);
      next(error); // Pass error to the error handling middleware
    }
  });
  

  app.use('/api/signup', async (req, res) => {
    console.log(req.body);
    const {username,email,password}=req.body.formdata;
    const newuser=UserModel({
        username:username,
        email:email,
        password:password
    })
  
    await newuser.save().then(()=>{
        console.log("Datas stored sucessfully")
    }).catch((e)=>{
        console.log(e.message);
    })
  });
  




app.listen(3000, () => {
    console.log('APP IS LISTENING TO THE PORT 3000!!');
});

