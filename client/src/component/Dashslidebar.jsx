import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
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
    <div className="fixed top-0 left-0 h-full w-60 ">
      <Sidebar
        aria-label="Dashboard Sidebar"
        className="h-full"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col h-full gap-4 pt-6">
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                icon={HiUser}
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  tab === "profile" ? "text-blue-400 font-semibold" : ""
                }`}
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Link to="/nightskill">
              <Sidebar.Item
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  tab === "nightskill" ? "text-blue-400 font-semibold" : ""
                }`}
              >
                NightSkill
              </Sidebar.Item>
            </Link>
            <Link to="/dayskill">
              <Sidebar.Item
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  tab === "dayskill" ? "text-blue-400 font-semibold" : ""
                }`}
              >
                DaySkill
              </Sidebar.Item>
            </Link>
            <Link to="/ongoing">
              <Sidebar.Item
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  tab === "ongoing" ? "text-blue-400 font-semibold" : ""
                }`}
              >
                Ongoing Skill
              </Sidebar.Item>
            </Link>
            <Link to="/attendence">
              <Sidebar.Item
                className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                  tab === "attendence" ? "text-blue-400 font-semibold" : ""
                }`}
              >
                Attendance Sheet
              </Sidebar.Item>
            </Link>
            {current.isadmin && (
              <>
                <Link to="/assignstaff">
                  <Sidebar.Item
                    className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                      tab === "assignstaff"
                        ? "text-blue-400 font-semibold"
                        : ""
                    }`}
                  >
                    Assign Staff
                  </Sidebar.Item>
                </Link>
                <Link to="/skillregistered">
                  <Sidebar.Item
                    className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                      tab === "skillregistered"
                        ? "text-blue-400 font-semibold"
                        : ""
                    }`}
                  >
                    Skill Registered Students
                  </Sidebar.Item>
                </Link>
                <Link to="/editattendence">
                  <Sidebar.Item
                    className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                      tab === "editattendence"
                        ? "text-blue-400 font-semibold"
                        : ""
                    }`}
                  >
                    Edit Attendance
                  </Sidebar.Item>
                </Link>
              </>
            )}
            <Sidebar.Item
              icon={HiArrowSmRight}
              className={`flex items-center gap-4 p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                tab === "signout" ? "text-blue-400 font-semibold" : ""
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

