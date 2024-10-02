import { Sidebar } from "flowbite-react";
import { HiUser } from 'react-icons/hi';
import { HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { signOutsuccess } from "../redux/user/slice";


export default function DashSidebar() {
  const current = useSelector((state) => state.user.currentuser);
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/signout');
      if (res.status) {
        dispatch(signOutsuccess());
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="fixed top-15 left-0 h-full w-59 bg-slate-800 font-bold">
      <Sidebar aria-label="Dashboard Sidebar" className=" h-full bg-slate-800">
        <Sidebar.Items >
          <Sidebar.ItemGroup className="flex flex-col gap-4 pt-6">
            <Link to='/dashboard?tab=profile'>
              <Sidebar.Item
                icon={HiUser}
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-purple-700 font-sans ${
                  tab === 'Profile' ? 'text-yellow-300':'text-pink-500'
                }`}
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Link to='/nightskill'>
              <Sidebar.Item  className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-purple-700 font-sans ${
                  tab === 'nightskill' ? 'text-yellow-300':'text-pink-500'
                }`}>
                NightSkill
              </Sidebar.Item>
            </Link>
            <Link to='/dayskill'>
              <Sidebar.Item className={`cursor-pointer hover:bg-purple-700 font-sans ${
                  tab === 'dayskill' ? 'text-yellow-300':'text-pink-500'
                }`}>
                DaySkill
              </Sidebar.Item >
            </Link>
            <Link to='/ongoing'>
            <Sidebar.Item className={`cursor-pointer hover:bg-purple-700 font-sans ${
                  tab === 'ongoing' ? 'text-yellow-300':'text-pink-500'
                }`}>
                Ongoing Skill
              </Sidebar.Item>
            </Link>
            <Link to='/attendence'>
            <Sidebar.Item className={`cursor-pointer hover:bg-purple-700 font-sans ${
                  tab === 'ongoing' ? 'text-yellow-300':'text-pink-500'
                }`}>
                Attendence Sheet
              </Sidebar.Item>
            </Link>
            {current.isadmin && (
              <>
                <Link to='/assignstaff'>
                <Sidebar.Item className={`cursor-pointer hover:bg-purple-700 font-sans ${
                  tab === 'assignstaff' ? 'text-yellow-300':'text-pink-500'
                }`}>
                    Assign Staff
                  </Sidebar.Item>
                </Link>
                <Link to='/skillregistered'>
                <Sidebar.Item className={`cursor-pointer hover:bg-purple-700 font-sans ${
                  tab === 'skillregistered' ? 'text-yellow-300':'text-pink-500'
                }`}>
                    Skill Registered Students
                  </Sidebar.Item>
                </Link>
              </>
            )}
            
            <Sidebar.Item icon={HiArrowSmRight} className={`cursor-pointer hover:bg-purple-700 font-sans ${
                  tab === 'signout' ? 'text-yellow-300':'text-pink-500'
                }`} onClick={handleSignOut}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
