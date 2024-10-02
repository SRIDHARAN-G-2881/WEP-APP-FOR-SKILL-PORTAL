import { TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function Dashprofile() {
  const current = useSelector((state) => state.user.currentuser);

  return (
    <div className="max-w-lg mx-auto p-6 w-full bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 rounded-lg shadow-md">
      <h1 className="my-7 font-semibold text-3xl text-center text-gray-800">Profile</h1>
      <form className="flex flex-col gap-6">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.WRwcG_nGZtGmPpatDlcWPQHaE8&pid=Api&P=0&h=180"
            alt="user"
            className="rounded-full w-full h-full object-cover border-4 border-blue-400"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={current.username}
          className="bg-white border-gray-300 rounded-lg shadow-sm"
        />
        <TextInput
          type="text"
          id="email"
          placeholder="Email"
          defaultValue={current.email}
          className="bg-white border-gray-300 rounded-lg shadow-sm"
        />
        <h3 className="font-semibold text-xl text-gray-700">
          Your attendance percentage in this skill is 68.5%
        </h3>
        <h3 className="font-bold text-xl text-red-600">
          80% and above is mandatory to attend the final assessment and task completion
        </h3>
      </form>
    </div>
  );
}
