import { TextInput } from "flowbite-react"
import { useSelector } from "react-redux"
export default function Dashprofile() {
    const current=useSelector((state)=>state.user.currentuser)
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-centre font-semibold text-3xl text-center">profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
         <img src={current.photoURL} alt="user" className="rounded-full w-full h-full object-cover border-8"/>
         </div>
         <TextInput type="text" id='username' placeholder='username'defaultValue={current.displayName}/>
         <TextInput type="text" id='email' placeholder='email'defaultValue={current.email}/>
         <h3 className="font-semibold text-3xl">Your attendence percentage in this skill is 68.5%</h3>
         <h3 className="font-bold text-3xl">80% and above is mandatory to attend the final assesment and task completion</h3>

      </form>
    </div>
  )
}
