
import { Sidebar } from "flowbite-react";
import {HiUser} from 'react-icons/hi'
import {HiArrowSmRight} from 'react-icons/hi';
import { useEffect,useState } from "react";
import {  useLocation } from "react-router-dom"
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from 'axios';
import { signOutsuccess } from "../redux/user/slice";

export default function DashSidebar() {
  const current=useSelector((state)=>state.user.currentuser);
  const location=useLocation();
  const [tab,setTab]=useState('')
  const dispatch=useDispatch();
  
  const handlechange=async ()=>{
    try{
     const res=await axios.post('http://localhost:3000/api/signout')
     if(res.status){
      dispatch(signOutsuccess());
     }
     else{
      console.log(res.data.message);

     }
    }catch(error){
      console.log(error.message);
    }

  }
  useEffect(()=>{
    const urlparams=new URLSearchParams(location.search)
    const tabFromUrl=urlparams.get('tab');
    if(tabFromUrl){
    setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <Sidebar classname='w-full md:w-56 '>
      <Sidebar.Items>
        <Sidebar.ItemGroup className=" flex flex-col gap-4">
          <Link to='/dashboard?tab=profile'>
           <Sidebar.Item 
  
  icon={HiUser} 
  className={`flex items-center gap-2 p-2 rounded-md transition duration-200 ${tab === 'Profile' ? 'text-blue-500' : 'text-black-600'}`}
>
  Profile 
</Sidebar.Item>

          </Link>
          <Sidebar.Item  classname="courser-pointer">
            Nightskill
          </Sidebar.Item>
          <Sidebar.Item  classname="courser-pointer">
            DaySkill
          </Sidebar.Item>
          {current.isadmin?<Link to='/assignstaff'><Sidebar.Item className="cursor-pointer"> 
            Assignstaff
          </Sidebar.Item></Link>:""}
          
          <Sidebar.Item  icon={HiArrowSmRight} classname="courser-pointer" onClick={handlechange}>
            Sign Out
          </Sidebar.Item>
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

