import express from "express";
import mongoose from "mongoose";
const app=express()
mongoose.connect("mongodb://localhost:27017/mernstack1").then(()=>{
    console.log("Mongo db conneted");
}).catch((e)=>{
    console.log(e)
})
app.listen(3000,()=>{
    console.log('APP IS LISTENING TO THE PORT 3000!!')
    
})