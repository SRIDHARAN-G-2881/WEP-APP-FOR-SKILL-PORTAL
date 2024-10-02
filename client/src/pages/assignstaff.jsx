import axios from "axios";
import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AssignStaff() {
  const [formdata, setformdata] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("formdata is:", formdata);
      const res = await axios.post('http://localhost:3000/api/assignstaff', formdata);
      if (res.status === 200) {
        console.log("successful");
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setformdata((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-lg">
      <h2 className="text-center text-4xl my-8 font-semibold text-gray-700">Staff and Lab Allocation</h2>
      <form className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type='text'
            placeholder="Enter the staff name"
            required
            id='name'
            className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition duration-300"
            onChange={handleChange}
          />
          <select
            id='skill'
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-700 bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition duration-300"
          >
            <option value=''>Select the skill</option>
            <option value='MERN'>MERN</option>
            <option value='JAVA'>Java</option>
            <option value='PYTHON'>Python</option>
          </select>
        </div>
        <select
          id="lab"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition duration-300"
        >
          <option value=''>Select the lab</option>
          <option value='CSE-1'>CSE LAB-1</option>
          <option value='CSE-2'>CSE LAB-2</option>
          <option value='CSE-3'>CSE LAB-3</option>
          <option value='CSE-4'>CSE LAB-4</option>
        </select>
        <Button
          className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-teal-600 transition duration-300"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
