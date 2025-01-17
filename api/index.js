import express from "express";

import mongoose from "mongoose";
import dayskillusermodel from "./models/dayskillusermodel.js";
import assignstaffusermodel from "./models/assignstaffusermodel.js";
import nightskillusermodel from "./models/nightskill.js";
import attendence from "./models/attendence.js";
import usermodel from "./models/usermodel.js";
import jwt from 'jsonwebtoken'
import bodyParser from "body-parser"; // Import body-parser
import router from './routes/userroutes.js';
import cors from 'cors'
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
app.put('/api/attendance/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const attendances = req.body; // Expecting an array of { userId, status }
    console.log(attendances);
    if (!Array.isArray(attendances)) {
      return res.status(400).json({ error: 'Request body should be an array of attendance records.' });
    }

    for (const attendance of attendances) {
      const { userId,name, status } = attendance;

      if (!userId || typeof status !== 'boolean') {
        return res.status(400).json({ error: 'Missing or invalid data for attendance record.' });
      }

      // Check if attendance exists for the user on the given date
      const existingAttendance = await attendence.findOne({ userId, date });
      if (existingAttendance) {
        // Update existing attendance
        existingAttendance.status = status;
        await existingAttendance.save();
      } else {
        // Create new attendance record
        const newAttendance = new attendence({
          userId,
          name,
          status,
          date,
        });
        await newAttendance.save();
      }
    }

    return res.status(200).json({ message: 'Attendance records updated successfully' });
  } catch (error) {
    console.error(error);
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
    if (user.some((u) => u.skill === skill)) {
      return res.status(201).json();
    }
    
    
  
  // const attendenceRecord = await attendence.findOne({ name: { $regex: new RegExp(name, 'i') } });
    const newuser=new dayskillusermodel({
      name:name,
      dept:dept,
      skill:skill,
      // attendence:attendenceRecord.id,
    
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
// Endpoint to fetch attendance for a specific date
app.get('/api/attendance/:date', async (req, res) => {
  try {
    // Get the date from the URL parameter
    const { date } = req.params;

    // Validate the date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    // Query the attendance data for the given date
    const attendanceRecords = await attendence.find({ date: date });

    // Check if any attendance records were found for that date
    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for the given date.' });
    }

    // Return the attendance records
    return res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});
app.put('/api/attendance/:date', async (req, res) => {
  const { date } = req.params;
  const attendances = req.body; // List of { userId, status } for the day

  try {
    // Ensure the user is admin or staff
    const user = await usermodel.findById(req.user.id); // Assume you have user info in req.user
    if (!user || (!user.isadmin && !user.isstaff)) {
      return res.status(403).json({ error: 'You are not authorized to update attendance.' });
    }

    // Iterate through the attendance records and either create or update them
    for (const attendance of attendances) {
      const { userId, status } = attendance;

      // Check if the attendance record exists for the given user and date
      const existingAttendance = await attendence.findOne({ userId, date });

      if (existingAttendance) {
        // Update the existing attendance record
        existingAttendance.status = status;
        await existingAttendance.save();
      } else {
        // If attendance doesn't exist for the user and date, create a new one
        const newAttendance = new attendence({
          userId,
          date,
          status,
        });
        await newAttendance.save();
      }
    }

    return res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});
app.get('/api/stats', async (req, res) => {
  try {
    const skillStats = await dayskillusermodel.aggregate([
      { $group: { _id: '$skill', count: { $sum: 1 } } }
    ]);

    const totalStudents = await dayskillusermodel.countDocuments();

    res.status(200).json({ skillStats, totalStudents });
  } catch (error) {
    console.error('Error fetching skill stats:', error);
    res.status(500).json({ error: 'Error fetching skill statistics.' });
  }
});
app.post('/api/attendance/filter', async (req, res) => {
  const { skill, date } = req.body;

  if (!skill || !date) {
    return res.status(400).json({ error: "Skill and date are required." });
  }

  try {
    const students = await dayskillusermodel.find({ skill });
    const attendanceRecords = await attendence.find({ date });

    const data = students.map((student) => {
      const attendance = attendanceRecords.find(
        (record) => record.userId.toString() === student._id.toString()
      );

      return {
        userId: student._id,
        name: student.name,
        dept: student.dept,
        skill: student.skill,
        status: attendance ? attendance.status : false,
      };
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ error: 'Error fetching attendance data.' });
  }
});

app.put('/api/attendance/update', async (req, res) => {
  const { date, attendanceData } = req.body;

  // Validate the request body
  if (!date || !Array.isArray(attendanceData)) {
    return res.status(400).json({ error: "Date and attendance data are required." });
  }

  try {
    // Iterate through the attendance data to update or create records
    for (const record of attendanceData) {
      const { userId, status } = record;

      // Validate each record
      if (!userId || typeof status !== "boolean") {
        return res.status(400).json({ error: "Invalid data format in attendance records." });
      }

      // Check if the userId exists in the User collection
      const user = await dayskillusermodel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: `User with ID ${userId} not found.` });
      }

      // Find existing attendance record for the given userId and date
      const existingRecord = await attendence.findOne({ userId, date });

      if (existingRecord) {
        // Update the existing attendance record
        existingRecord.status = status;
        await existingRecord.save();
      } else {
        // Create a new attendance record if none exists
        const newRecord = new attendence({
          userId,
          name: user.name, // Use user name from the database
          status,
          date,
        });
        await newRecord.save();
      }
    }

    res.status(200).json({ message: 'Attendance updated successfully.' });
  } catch (error) {
    console.error('Error updating attendance:', error.message || error);
    res.status(500).json({ error: 'Error updating attendance.' });
  }
});







