import express from "express";

import mongoose from "mongoose";
import dayskillusermodel from "./models/dayskillusermodel.js";
import assignstaffusermodel from "./models/assignstaffusermodel.js";
import nightskillusermodel from "./models/nightskill.js";
import attendence from "./models/attendence.js";
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
        username: name,
        email,
        password: randomPassword, 
        profilePicture: googlePhotoUrl,
    
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
app.post('/api/attendences', async (req, res) => {
  try {
    // Log the entire request body to check the data
    console.log('Request Body:', req.body);

    const attendances = req.body; // Expecting an array of { name, status } objects

    if (!Array.isArray(attendances)) {
      return res.status(400).json({ error: 'Request body should be an array of attendance records.' });
    }

    // Iterate over the array and save each attendance record
    for (const attendance of attendances) {
      const { name, status } = attendance;

      // Validate each record
      if (typeof status !== 'boolean') {
        return res.status(400).json({ error: `Status for ${name} must be a boolean.` });
      }

      const userAttendance = new attendence({
        name: name,
        status: status,
      });

      await userAttendance.save();
    }

    console.log("All attendance records saved successfully");
    return res.status(200).json({ message: "All attendance records saved successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
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

app.post('/api/dayskill',async (req,res)=>{
  try{
    const {name,dept,skill}=req.body;
    const user= await dayskillusermodel.find({ name: { $regex: new RegExp(name, 'i') } });
    console.log(user);
    console.log(skill);
    if(user.length>0){
    if(user[0].skill==skill){
      return res.status(201).json();
    }
  }
  const attendenceRecord = await attendence.findOne({ name: { $regex: new RegExp(name, 'i') } });
    const newuser=new dayskillusermodel({
      name:name,
      dept:dept,
      skill:skill,
      attendence:attendenceRecord.id,
    
    })
    await newuser.save();
    return res.status(200).json();

  }catch(error){
    console.log(error)
  }

  
})
app.post('/api/nightskill',async (req,res)=>{


  try{

    const {name,dept,skill}=req.body;
    const userr=await nightskillusermodel.find({ name: { $regex: new RegExp(name, 'i') } });
    if(userr.length>0){
      if(userr[0].skill==skill){
        return res.status(201).json();
      }
    }
      const newuserr=new nightskillusermodel({
        name:name,
        dept:dept,
        skill:skill,
      })
      await newuserr.save();
      return res.status(200).json();


  }
  catch(error){
    console.log(error.message);
  }


})
app.get('/api/getuser',async (req,res)=>{
  try{
    dayskillusermodel.find()
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
  }
  catch(error){
    console.log(error);
  }
})
app.get('/api/getonuser', async (req, res) => {
  try {
      const { name } = req.query; // Use req.query to get query parameters
      console.log('Query parameter name:', name);
      
      const user = await dayskillusermodel.find({ name: { $regex: new RegExp(name, 'i') } });
      console.log(user);
      return res.json(user);
  } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
  }
});
app.post('/api/assignstaff',async(req,res)=>{
  try{
    const {name,skill,lab}=req.body;
    console.log({name},{skill},{lab});
    const newuser =new assignstaffusermodel({
       name,
       skill,
       lab
    })
    await newuser.save();
    return res.status(200).json("Stored sucessfullty")
    
    


  }
  catch(error){
    console.log(error);
  }
})
app.get('/api/getonuserdata',async(req,res)=>{
  try{
  const skill=req.body;
  console.log(skill);
  const user = await assignstaffusermodel.findOne({ skill: { $regex: new RegExp(skill, 'i') } });
  

  return res.status(200).json(user);
  }catch(error){
    console.log(error);
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

