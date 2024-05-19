import { Button, Label, TextInput } from "flowbite-react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Signin() {
  const [formdata, setformdata] = useState({});

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  console.log(formdata)
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/signup', {formdata});
      if (res.status === 200) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:lex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xL">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">SKILL PORTAL</span>
          </Link>
          <p className="text-5m mt-5">
            Knowledge is not skill. Knowledge plus ten thousand times is skill.
          </p>
        </div>
        {/*Right*/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
            <div>
              <Label value="Your UserName" />
              <TextInput type='text' placeholder="username" id="username" onChange={handlechange} />
            </div>
            <div>
              <Label value="email" />
              <TextInput type='email' placeholder="email" id="email" onChange={handlechange} />
            </div>
            <div>
              <Label value="password" />
              <TextInput type='password' placeholder="password" id="password" onChange={handlechange} />
            </div>
            <Button className="px-9 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white" type='submit'>
              Sign Up
            </Button>
          </form>
          <div className="flext gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signup' className="text-blue-500">
              Sign In
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
