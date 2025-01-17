import  { useEffect, useState } from "react";
import axios from "axios";

export default function SkillStats() {
  const [stats, setStats] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/stats")
      .then((response) => {
        setStats(response.data.skillStats);
        setTotalStudents(response.data.totalStudents);
      })
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  if (stats.length === 0) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
          Skill Registration Statistics
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((skill) => (
            <div
              key={skill._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {skill._id}
              </h2>
              <p className="text-gray-600 mt-2">Registered Students</p>
              <div className="mt-4 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${(skill.count / totalStudents) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-gray-700 mt-2 font-bold">
                {skill.count} Students
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Total Students Registered
          </h2>
          <p className="text-indigo-700 text-4xl font-extrabold mt-2">
            {totalStudents}
          </p>
        </div>
      </div>
    </div>
  );
}
