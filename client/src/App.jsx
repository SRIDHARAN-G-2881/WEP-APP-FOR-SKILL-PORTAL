import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Project from './pages/project'
import Footer from './component/footer'
import About from './pages/about'
import Header from './component/header'
import Nightskill from './pages/nightskill'
import Dayskill from './pages/dayskill'
export default function App() {
  return (
    <BrowserRouter>
    <Header />
    
    <Routes>
      <Route path='/nightskill'element={<Nightskill />}/>
      <Route path='/dayskill' element={<Dayskill></Dayskill>}/>
       <Route path="/" element={<Home/>} />
       <Route path="/signup" element={<Signin />} />
       <Route path="dashboard" element={<Dashboard />} />
       <Route path="/signin" element={<Signup />} />
       <Route path="/about" element={<About />} />
       <Route path="/project" element={<Project />} />
    </Routes>
    <Footer />
    
    
    </BrowserRouter>
  )
}

