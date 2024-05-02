import { Button, Navbar, TextInput } from "flowbite-react"
import { Link ,useLocation} from "react-router-dom"
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const path=useLocation().pathname
  return (
    <Navbar className="border-b-2 justify-between items-center">
      <Link to="/" className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">SKILL PORTAL</span>
      </Link>
      <div className="flex items-center">
        <Navbar.Collapse>
          <Navbar.Link>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/project">Project</Link>
          </Navbar.Link>
        </Navbar.Collapse>
        <div className="flex items-center mx-40 gap-20" >
          <Link to='/' > <Button color='black'>
          Home
      </Button>
      </Link>
      <Link to='/about'> <Button color='black'>About</Button></Link>
      <Link to='/dashboard'>
        <Button color='black'>
          Dashboard
        </Button>
      </Link>
      <Link to='/nightskill' active={'/nightskil'=== path}>
        <Button color='black'>Night skill</Button>
      </Link>
      <Link to='/dayskill' active>
        <Button color='black'>Dayskill</Button>
      </Link>
       </div>
        <form className="ml-auto hidden lg:flex">
          <TextInput
            type="text"
            placeholder="Search..."
            leftIcon={AiOutlineSearch}
            className="mr-00"
          />
        </form>
       <Button className="w-12 h-10 sg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
        <Button>
          <FaMoon />
        </Button>
        <Button className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white transition bg-opacity-100 hover:bg-opacity-75 focus:bg-opacity-75" >Sign in</Button>

      </div>
      
      
     
    </Navbar>
  )
}
