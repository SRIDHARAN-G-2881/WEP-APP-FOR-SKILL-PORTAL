import { Avatar, Button,Dropdown,DropdownDivider,Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const path = useLocation().pathname;
  const current=useSelector((state)=>state.user.currentuser);

  return (
    <Navbar className="border-b-2 justify-between items-center">
      <Link to="/" className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">SKILL PORTAL</span>
      </Link>
      <div className="flex items-center">
        <Navbar.Collapse>
          <Navbar.Link>
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/project">Project</Link>
          </Navbar.Link>
        </Navbar.Collapse>
        <div className="flex items-center mx-40 gap-20">
          <Link to='/home'><Button color='black'>Home</Button></Link>
          <Link to='/about'><Button color='black'>About</Button></Link>
          <Link to='/dashboard'><Button color='black'>Dashboard</Button></Link>
          <Link to='/nightskill' active={'/nightskill' === path}><Button color='black'>Night skill</Button></Link>
          <Link to='/dayskill'><Button color='black'>Dayskill</Button></Link>
         
        </div>
        
      
        <Button className="w-12 h-10 sg:hidden" color="gray" pill>
        {current?(<Dropdown arrowIcon={false} inline label={
          <Avatar alt='user' img={current.photoURL}
          rounded/>
        }><Dropdown.Header>
          <span className="block text-sm">@{current.displayName}</span>
          <span className="block text-sm font-medium truncate">@{current.email}</span>
       </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>profile</Dropdown.Item>
            
            </Link>
          <DropdownDivider/>
          <Dropdown.Item>Sign out</Dropdown.Item>
          
          </Dropdown>):(<Button className="px-9 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white" type='submit'>
        Sign Up
      </Button>)}
      
       


        
         
        </Button>
  
        
  
      </div>
    </Navbar>
  );
}
