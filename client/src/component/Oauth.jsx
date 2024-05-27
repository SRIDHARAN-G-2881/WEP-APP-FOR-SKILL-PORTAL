import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from 'react-icons/ai';
import axios from 'axios';
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { singInsucess } from "../redux/user/slice";
import { useNavigate } from "react-router-dom";
export default function Oauth() {
  const auth=getAuth(app);
  const navigate=useNavigate
  const dispatch=useDispatch();
  const handleGoogleclick=async ()=>{
    const provider=new GoogleAuthProvider()
    provider.setCustomParameters({prompt:'select_account'})
    try{
const resultsFromGoogle=await signInWithPopup(auth,provider);
const res = await axios.post('http://localhost:3000/api/google/auth',{
  method:'POST',
  headers:{'content-type':'application/json'},
  body:JSON.stringify({
    name:resultsFromGoogle.user.displayName,
    email:resultsFromGoogle.user.email,
    googlePhotoUrl:resultsFromGoogle.user.photoURL,
  })
}
);
  const data=await res.json();
 if(res.status === 200){
       dispatch(singInsucess(data))
       navigate('/home');
 }


 }
 catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      <Button className="px-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mt-4 w-full max-w-md" type="submit" outline onClick={handleGoogleclick}>
        <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
          Continue with Google
        </Button>
    </div>
  )
}
