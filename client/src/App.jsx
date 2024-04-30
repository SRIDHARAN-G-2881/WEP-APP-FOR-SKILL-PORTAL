import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Project from './pages/project'
import About from './pages/about'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/sigin" element={<Signin />} />
       <Route path="dashboard" element={<Dashboard />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/about" element={<About />} />
       <Route path="/project" element={<Project />} />

    </Routes>
    
    
    </BrowserRouter>
  )
}

