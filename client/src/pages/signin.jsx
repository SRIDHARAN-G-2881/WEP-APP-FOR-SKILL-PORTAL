  import { Alert, Button, Label, TextInput } from "flowbite-react";
  import { useState } from 'react';
  import { Link} from "react-router-dom";
  import axios from 'axios';
  import { useDispatch ,useSelector} from "react-redux";
  import { singInsucess,signInfailer,signInstart } from "../redux/user/slice";

  export default function Signup() {
    const [formdata, setformdata] = useState({});
    const dispatch=useDispatch();
    const {loading,error:errormessage}=useSelector(state=>state.user);
    console.log(loading);
    const handlechange = (e) => {
      setformdata({ ...formdata, [e.target.id]: e.target.value });
    };

    console.log(formdata)
    const handlesubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(signInstart());
        const res = await axios.post('http://localhost:3000/api/signin', {formdata});
        if (res.status === 200) { // Checking status code
          // Assuming you have some logic to store the token in local storage
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('email', res.data.email);
          // Redirecting to home page
          window.location.href = '/';
          dispatch(singInsucess())
        }
      } catch (error) {
        dispatch(signInfailer(error.message));
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
            You can sign-in  with email id or password
            </p>
          </div>
          {/*Right*/}
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
              <div>
                <Label value="email" />
                <TextInput type='email' placeholder="email" id="email" onChange={handlechange} />
              </div>
              <div>
                <Label value="password" />
                <TextInput type='password' placeholder="password" id="password"  onChange={handlechange} />
              </div>
              <Button className="px-9 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white" type='submit'>
                Sign Up
              </Button>
            </form>
            <div className="flext gap-2 text-sm mt-5">
              <span> Dont Have an account?</span>
              <Link to='/signin' className="text-blue-500">
                Sign In
              </Link>
            </div>
            {errormessage &&(
              <Alert className=",t-5" color='faiiure'>
                {errormessage}
              </Alert>
            )}
            <div></div>
          </div>
        </div>
      </div>
    );
  }
