/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Sidebar from "../component/Dashslidebar"
import Dashprofile from "../component/Dashprofile";
import { useLocation } from "react-router-dom"
export default function dashboard() {
  const location=useLocation();
  const [tab,setTab]=useState('')
  useEffect(()=>{
    const urlparams=new URLSearchParams(location.search)
    const tabFromUrl=urlparams.get('tab');
    if(tabFromUrl){
    setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <Sidebar/>
        </div>
       
      {tab ==='profile' && <Dashprofile/>}
    </div>
   
    
  )
}
