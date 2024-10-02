import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from 'react-icons/ai';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInsuccess, signInfailer } from "../redux/user/slice";
import { useDispatch } from 'react-redux';

export default function Oauth() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log('Google sign-in result:', resultsFromGoogle); // Log Google sign-in result for debugging

      const res = await axios.post('http://localhost:3000/api/auth/google', {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      });
      console.log(res);

      if (res.status === 200) {
        dispatch(signInsuccess(res.data));
        navigate('/home', { state: { displayName: resultsFromGoogle.user.displayName } });
      }
    } catch (error) {
      dispatch(signInfailer(error));
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <div>
      <Button
        className="flex items-center px-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mt-4 w-full max-w-md"
        onClick={handleGoogleClick}
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with Google
      </Button>
    </div>
  );
}
