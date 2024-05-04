import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

export default function footer() {
  return (
  <Footer container className="border border-t-8 border-teal-500">
  <div className="w-full maxx-w-7xl mx-auto" >
    <div className="grid w-full justify-between sm:flex md:grid-cols-1">
   <div className="mt-5">
   <Link to="/" className="whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">SKILL PORTAL</span>
      </Link>
    
   </div>
   <div className="grid grid-flow-col-2 gap-8  mt-4 sm:grid-cols-3 sm:gap-6">
    <div className="gap-9 font-semibold">
    <Footer.Title title="About"/>
    <Footer.LinkGroup col>
   <Footer.Link href='https://www.google.com' target="_blank" rel="noopener noreffer">
    Skill based portal
   </Footer.Link>
   <Footer.Link href='localhost:5173/about' target="_blank" rel="noopener noreffer">
    About skill portal
   </Footer.Link>

    </Footer.LinkGroup>
    </div>
    
   </div>

    </div>
  </div>
 



   </Footer>
  )
}
