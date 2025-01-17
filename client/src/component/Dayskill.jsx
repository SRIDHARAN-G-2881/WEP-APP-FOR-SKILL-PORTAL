import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function DaySkill() {
  const [formData, setFormData] = useState({});
  const [state, setState] = useState(0); // 0: no error, 1: error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data: ", formData);
    try {
      const res = await axios.post('http://localhost:3000/api/dayskill', formData);
      if (res.status === 200) {
        console.log("The skill data saved successfully");
        setFormData({}); // Reset the form data
        setState(0); // Clear error state
        navigate('/dashboard'); // Navigate to the dashboard
      } else if (res.status === 201) {
        console.log("A user with the same skill already exists");
        setState(1); // Set error state
      } else {
        console.log("Unexpected status code:", res.status);
        setState(1); // Handle unexpected status as an error
      }
    } catch (error) {
      console.log(error.message);
      setState(1); // Set error state on network/server error
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  return (
    <div className="p-5 max-w-4xl mx-auto flex flex-col justify-center items-center gap-6 bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-lg">
      <h2 className="text-center text-4xl my-5 font-bold text-gray-800">Day Skill Choice Form</h2>
      <form className="flex flex-col gap-6 w-full max-w-lg bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="w-full">
          <TextInput
            type="text"
            placeholder="Enter your name"
            required
            id="name"
            value={formData.name || ''} // Bind the input value to state
            className="w-full p-3 text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <select
            id="dept"
            value={formData.dept || ''} // Bind the input value to state
            className="w-full p-3 text-base border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
            onChange={handleChange}
          >
            <option value=''>Select the department</option>
            <option value='CSE'>CSE</option>
            <option value='CSBS'>CSBS</option>
            <option value='ECE'>ECE</option>
            <option value='AIDS'>AIDS</option>
            <option value='AIML'>AIML</option>
          </select>
        </div>
        <div className="w-full">
          <select
            id="skill"
            value={formData.skill || ''} // Bind the input value to state
            className="w-full p-3 text-base border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
            onChange={handleChange}
          >
            <option value=''>Select the Skill</option>
            <option value='MERN'>MERN</option>
            <option value='PYTHON'>PYTHON</option>
            <option value='JAVA'>JAVA</option>
            <option value='MEAN'>MEAN</option>
            <option value='REACT'>REACT</option>
          </select>
        </div>
        <div className="flex justify-center">
          <Button type='submit' className="font-semibold bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Submit
          </Button>
        </div>
        {state === 1 && (
          <h2 className="text-red-600 font-semibold text-center mt-4">
            Sorry!! You have already completed this skill in the previous semester.
          </h2>
        )}
      </form>
    </div>
  );
}
