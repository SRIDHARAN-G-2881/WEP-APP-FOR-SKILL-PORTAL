import express from 'express'
const router=express.Router();
router.get('/front',(req,res)=>{
  res.json({message:'your API is working'})

});
export default router;