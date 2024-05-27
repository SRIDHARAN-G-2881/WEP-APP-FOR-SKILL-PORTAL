import {BrowserRouter,Routes,Route, useLocation} from 'react-router-dom'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Project from './pages/project'
import About from './pages/about'
import Header from './component/header'
import Nightskill from './pages/nightskill'
import Dayskill from './pages/dayskill'
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
     <Route path="dashboard" element={<Dashboard />} />
     <Route path="/" element={<Signup />} />
     <Route path="/about" element={<About />} />
     <Route path="/project" element={<Project />} />
  </Routes>
  </div>
  );

}

