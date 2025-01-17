import { Avatar, Button, Dropdown, DropdownDivider, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const path = useLocation().pathname;
  const current = useSelector((state) => state.user.currentuser);

  return (
    <Navbar className="border-b-0 justify-between items-center bg-gradient-to-r from-blue-100 to-blue-300 py-4">
      <Link to="/" className="whitespace-nowrap text-sm sm:text-xl font-semibold text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
          SKILL PORTAL
        </span>
      </Link>
      <div className="flex items-center">
        <Navbar.Collapse>
          <Navbar.Link>
            <Link to="/home" className="text-blue-900 hover:text-blue-700 mx-2">Home</Link>
            <Link to="/about" className="text-blue-900 hover:text-blue-700 mx-2">About</Link>
            <Link to="/dashboard" className="text-blue-900 hover:text-blue-700 mx-2">Dashboard</Link>
            <Link to="/project" className="text-blue-900 hover:text-blue-700 mx-2">Project</Link>
          </Navbar.Link>
        </Navbar.Collapse>
        <div className="flex items-center mx-40 gap-4">
          <Link to='/home'>
            <Button className="bg-blue-700 hover:border-4 border-gray-800 text-white">Home</Button>
          </Link>
          <Link to='/about'>
            <Button className="bg-blue-700 hover:border-4 border-gray-800 text-white">About</Button>
          </Link>
          <Link to='/dashboard'>
            <Button className=" bg-blue-700 hover:border-4 border-gray-800 text-white">Dashboard</Button>
          </Link>
          <Link to='/nightskill' active={'/nightskill' === path}>
            <Button className="bg-blue-700 hover:border-4 border-gray-800 text-white">Night Skill</Button>
          </Link>
          <Link to='/dayskill'>
            <Button className="bg-blue-700 hover:border-4 border-gray-800 text-white">Day Skill</Button>
          </Link>
        </div>

        <Button className="w-12 h-10 sm:hidden" color="gray" pill>
          {current ? (
            <Dropdown arrowIcon={false} inline label={
              <Avatar alt='user' img={current.photoURL} rounded />
            }>
              <Dropdown.Header>
                <span className="block text-sm">@{current.displayName}</span>
                <span className="block text-sm font-medium truncate">@{current.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <DropdownDivider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/signup">
              <Button className="px-9 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white" type='submit'>
                Sign Up
              </Button>
            </Link>
          )}
        </Button>
      </div>
    </Navbar>
  );
}
