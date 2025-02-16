/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import DashSidebar from "../component/Dashslidebar"; // Ensure your sidebar component is named and imported correctly
import Dashprofile from "../component/Dashprofile";
import { useLocation } from "react-router-dom";
import Nightskill from '../component/Nightskill'
import DaySkill from "../component/Dayskill";
import Ongoing from "../component/ongoing";
import SkillRegistered from "../component/attendence";
import AssignStaff from "./assignstaff";
import Editattendence from "./editAttendence";
import Summary from "../component/datas";
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-1/4 fixed top-0 left-0 h-full shadow-lg bg-gray-800 z-10">
        <DashSidebar setTab={setTab} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-[25%] p-6 overflow-y-auto bg-gray-100">
        {tab === "profile" ? (
          <Dashprofile />
        ) : tab === "nightskill" ? (
          <Nightskill/>
        ) : tab === "dayskill" ? (
          <DaySkill/>
        ) : tab === "ongoing" ? (
          <Ongoing/>
        ) : tab === "assignstaff" ? (
          <AssignStaff/>
        ): tab === "editattendence" ? (
          <Editattendence/>
        ):
        tab === "skillregistered" ? (
          <Summary/>
        ):
        tab === "attendence" ? (
          <SkillRegistered/>
        ) : (
          <div className="text-center">
            {/* Placeholder Image */}
            <img
              src="https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/edu/art/skill2-3616d23240.jpg"
              alt="Placeholder"
              className="w-3/4 mx-auto mb-5 rounded-lg shadow-md"
            />
            <h2 className="text-2xl font-bold text-gray-700">
              Welcome to your Dashboard
            </h2>
            <p className="text-gray-600 mt-2">
              Select a tab from the sidebar to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
