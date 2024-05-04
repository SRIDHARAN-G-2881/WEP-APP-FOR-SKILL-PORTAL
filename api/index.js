import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"; // Import body-parser
import router from './routes/userroutes.js';
import UserModel from './models/usermodel.js';
import cors from 'cors'
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/mernstack1")
 .then(() => {
    console.log("Mongo db connected");
  })
 .catch((e) => {
    console.error("Error connecting to MongoDB:", e);
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

