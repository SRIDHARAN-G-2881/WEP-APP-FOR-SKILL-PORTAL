import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiBriefcase, HiCalendar, HiClipboardList, HiCog, HiUserGroup, HiCheckCircle } from "react-icons/hi"; // Import relevant icons
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signOutsuccess } from "../redux/user/slice";

export default function DashSidebar() {
  const current = useSelector((state) => state.user.currentuser);
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/signout");
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
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="fixed top-0 left-0 h-full w-30">
      <Sidebar
        aria-label="Dashboard Sidebar"
        className="h-full bg-gray-900 shadow-lg" // Darker background color for the sidebar
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col h-full gap-4 pt-6">
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                icon={HiUser}
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  tab === "profile" ? "text-black-400 font-bold" : "text-black"
                }`} // Light text color for visibility
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=nightskill">
              <Sidebar.Item
                icon={HiBriefcase} // Night Skill Icon
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  tab === "nightskill" ? "text-black-400 font-bold" : "text-black"
                }`}
              >
                Night Skill
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=dayskill">
              <Sidebar.Item
                icon={HiCalendar} // Day Skill Icon
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  tab === "dayskill" ? "text-black-400 font-bold" : "text-black"
                }`}
              >
                Day Skill
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=ongoing">
              <Sidebar.Item
                icon={HiClipboardList} // Ongoing Skill Icon
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  tab === "ongoing" ? "text-black-400 font-bold" : "text-black"
                }`}
              >
                Ongoing Skill
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=attendence">
              <Sidebar.Item
                icon={HiCheckCircle} // Attendance Icon
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  tab === "attendence" ? "text-black-400 font-bold" : "text-black"
                }`}
              >
                Attendance Sheet
              </Sidebar.Item>
            </Link>
            {current.isadmin && (
              <>
                <Link to="/dashboard?tab=assignstaff">
                  <Sidebar.Item
                    icon={HiUserGroup} // Assign Staff Icon
                    className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                      tab === "assignstaff" ? "text-black-400 font-bold" : "text-black"
                    }`}
                  >
                    Assign Staff
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=skillregistered">
                  <Sidebar.Item
                    icon={HiClipboardList} // Skill Registered Icon
                    className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                      tab === "skillregistered" ? "text-black-400 font-bold" : "text-black"
                    }`}
                  >
                    Skill Registered Students
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=editattendence">
                  <Sidebar.Item
                    icon={HiCog} // Edit Attendance Icon
                    className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                      tab === "editattendence" ? "text-black-400 font-bold" : "text-black"
                    }`}
                  >
                    Edit Attendance
                  </Sidebar.Item>
                </Link>
              </>
            )}
            <Sidebar.Item
              icon={HiArrowSmRight} // Sign Out Icon
              className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                tab === "signout" ? "text-black-400 font-bold" : "text-black"
              }`}
              onClick={handleSignOut}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
