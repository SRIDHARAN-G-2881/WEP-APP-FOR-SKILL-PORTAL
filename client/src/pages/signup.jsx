import pic from './pic.png';
import { Label } from 'flowbite-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import Oauth from '../component/Oauth';
const Home = () => {
 
  const [formdata, setformdata] = useState({});

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/signup', formdata);
      if (res.status === 200) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6 text-center md:items-start md:space-y-5">WELCOME TO SKILL PORTAL</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-20">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
            <img src={pic} className="w-full max-w-md h-auto" alt="Skill Portal" />
          </div>
          <div className="w-full md:w-1/3">
            <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
              <div>
                <Label value="Your UserName" />
                <TextInput
                  type="text"
                  placeholder="username"
                  id="username"
                  onChange={handlechange}
                  className="mt-1 block w-full max-w-md"
                />
              </div>
              <div>
                <Label value="Email" />
                <TextInput
                  type="email"
                  placeholder="email"
                  id="email"
                  onChange={handlechange}
                  className="mt-1 block w-full max-w-md"
                />
              </div>
              <div>
                <Label value="Password" />
                <TextInput
                  type="password"
                  placeholder="password"
                  id="password"
                  onChange={handlechange}
                  className="mt-1 block w-full max-w-md"
                />
              </div>
              <Button
                className="px-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mt-4 w-full max-w-md"
                type="submit"
              >
                Sign Up
              </Button>
              <Oauth/>
            
            </form>
            <div className="flex gap-2 text-sm mt-5 justify-center md:justify-start">
              <span>Have an account?</span>
              <Link to="/signin" className="text-blue-500">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
