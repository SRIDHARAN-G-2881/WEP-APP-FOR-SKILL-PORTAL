import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"

export default function signin() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:lex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
        <Link to="/" className=" font-bold dark:text-white text-4xL">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">SKILL PORTAL</span>
      </Link>
      <p className="text-5m mt-5">
      Knowledge is not skill. Knowledge plus ten thousand times is skill.      </p>

        </div>
        {/*Right*/}
        <div className="flex-1">
           <form className="flex flex-col gap-4">
             <div>
              <Label value="Your UserName" />
              <TextInput type='text' placeholder="username" id="username" />
             </div>
             <div>
              <Label value="Email" />
              <TextInput type='text' placeholder="Email" id="Email" />
             </div>
             <div>
              <Label value="password" />
              <TextInput type='text' placeholder="password" id="password" />
             </div>
             <Button className="px-9 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white" type='submit' text='centre'>
              Sign Up
             </Button>
           </form>
           <div className="flext gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signin' className="text-blue-500">
              Sign In
            </Link>


           </div>
           <div></div>

        </div>
        
        
        </div> 


    </div>
  )
}
