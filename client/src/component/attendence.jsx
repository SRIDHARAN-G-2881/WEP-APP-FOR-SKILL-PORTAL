import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SkillRegistered() {
  const [users, setUsers] = useState([]); // List of users
  const [checkedUsers, setCheckedUsers] = useState({}); // Attendance states
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
  const current = useSelector((state) => state.user.currentuser); // Access current user from Redux
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  // Fetch user data and attendance data
  useEffect(() => {
    // Fetch users' data
    axios.get('http://localhost:3000/api/getuser')
      .then(response => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      })
      .catch(err => console.error('Error fetching users:', err));

    // Fetch attendance data for the current date
    axios.get(`http://localhost:3000/api/attendance/${currentDate}`)
      .then(response => {
        const attendanceData = response.data;

        // Update checkedUsers state based on attendance data
        const updatedCheckedUsers = {};
        attendanceData.forEach(record => {
          updatedCheckedUsers[record.userId] = record.status;
        });
        setCheckedUsers(updatedCheckedUsers);
      })
      .catch(err => console.error('Error fetching attendance:', err));
  }, [currentDate]);

  // Handle checkbox change for each user
  const handleCheckboxChange = (id) => {
    console.log(current);
    if (current.isadmin || current.isstaff) {
      setCheckedUsers(prevChecked => ({
        ...prevChecked,
        [id]: !prevChecked[id], // Toggle the checkbox state
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Current date is:", currentDate);
    setLoading(true);
    setError(null);
    try {
      const attendances = users.map(user => ({
        userId: user._id,
        name: user.name, // Include the name field
        status: checkedUsers[user._id] || false,
      }));
  
      const res = await axios.put(`http://localhost:3000/api/attendance/${currentDate}`, attendances);
      if (res.status === 200) {
        console.log('Attendance data updated successfully');
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Skill Registered Users</h2>
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Attendance</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Dept</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Skill</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={checkedUsers[user._id] || false}
                        onChange={() => handleCheckboxChange(user._id)}
                        disabled={!(current.isadmin || current.isstaff)} // Disable for non-admin/staff
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.dept}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.skill}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-sm text-gray-500 text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
      {(current.isadmin || current.isstaff) && (
        <Button
          className="bg-slate-700 ml-5 mt-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "SUBMIT"}
        </Button>
      )}
    </div>
  );
}
