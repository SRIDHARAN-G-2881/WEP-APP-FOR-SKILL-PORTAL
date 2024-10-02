/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Sidebar from "../component/Dashslidebar";
import Dashprofile from "../component/Dashprofile";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar with Enforced Background Color */}
      <div
        className="md:w-56 bg-blue-900 text-white shadow-lg"
        style={{ backgroundColor: '#1E3A8A' }} // Fallback to ensure the color
      >
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100 flex justify-center items-center">
        {tab === 'profile' ? (
          <Dashprofile />
        ) : (
          <div className="text-center">
            {/* Placeholder Image */}
            <img
              src="https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/edu/art/skill2-3616d23240.jpg"
              alt="Placeholder"
              className="w-3/4 mx-auto mb-5 rounded-lg shadow-md"
            />
            <h2 className="text-2xl font-bold text-gray-700">Welcome to your Dashboard</h2>
            <p className="text-gray-600 mt-2">
              Select a tab from the sidebar to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
