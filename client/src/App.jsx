import {BrowserRouter,Routes,Route, useLocation} from 'react-router-dom'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Onlyadminprivaterouter from './component/onlyadminprivateroute'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Project from './pages/project'
import Privaterouter from './component/privaterouter'
import About from './pages/about'
import Header from './component/header'
import Nightskill from './pages/nightskill'
import Dayskill from './pages/dayskill'
import Assignstaff from './pages/assignstaff'
export default function App() {
  return (
    <BrowserRouter>
    <Main/>
 
    
    </BrowserRouter>
  )
}
function Main() {
  const location = useLocation();
  const path = location.pathname === '/';
  return(
    <div>
  {!path && <Header/>};
    
  <Routes>
    <Route path='/nightskill'element={<Nightskill />}/>
    <Route path='/dayskill' element={<Dayskill></Dayskill>}/>
     <Route path="/home" element={<Home/>} />
     <Route path="/signin" element={<Signin />} />
     <Route element={<Privaterouter/>}>
         <Route path="/dashboard" element={<Dashboard />} />
     </Route>
     <Route element={<Onlyadminprivaterouter/>}>
         <Route path="/assignstaff" element={<Assignstaff />} />
     </Route>
     <Route path="/" element={<Signup />} />
     <Route path="/about" element={<About />} />
     <Route path="/project" element={<Project />} />
  </Routes>
  </div>
  );

}

