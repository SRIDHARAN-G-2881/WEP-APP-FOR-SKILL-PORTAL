import { useState } from 'react';
import axios from 'axios';

export default function AttendancePage() {
  const [skill, setSkill] = useState('');
  const [date, setDate] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Convert date to DD-MM-YYYY format
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleFetch = async () => {
    setError('');
    setLoading(true);

    // Validate date format (YYYY-MM-DD)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!date || !datePattern.test(date)) {
      setError("Invalid date format. Use YYYY-MM-DD.");
      setLoading(false);
      return;
    }

    try {
      const formattedDate = formatDate(date);
      const response = await axios.post('http://localhost:3000/api/attendance/filter', {
        skill,
        date: formattedDate,
      });
      setStudents(response.data);
    } catch (err) {
      setError('Error fetching attendance data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (userId) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.userId === userId ? { ...student, status: !student.status } : student
      )
    );
  };

  const handleSubmit = async () => {
    // Validate date format again on submit
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!date || !datePattern.test(date)) {
      setError("Invalid date format. Use YYYY-MM-DD.");
      return;
    }
  
    try {
      const formattedDate = formatDate(date);
      const attendanceData = students
        .filter((student) => student.userId && typeof student.status === "boolean")
        .map(({ userId, status }) => ({ userId, status }));
  
      console.log("Sending payload:", { date: formattedDate, attendanceData });
  
      await axios.put('http://localhost:3000/api/attendance/update', {
        date: formattedDate,
        attendanceData,
      });
  
      alert('Attendance updated successfully!');
    } catch (err) {
      console.error('Error during submission:', err.response?.data || err.message);
      // Silently log the error without displaying it to the user
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Attendance Management</h1>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Skill Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Date:</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          onClick={handleFetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>

        {error && <div className="text-red-500 mt-4">{error}</div>}

        {students.length > 0 && (
          <div className="mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Dept</th>
                  <th className="px-4 py-2">Skill</th>
                  <th className="px-4 py-2">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.userId}>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.dept}</td>
                    <td className="border px-4 py-2">{student.skill}</td>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={student.status}
                        onChange={() => handleCheckboxChange(student.userId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
