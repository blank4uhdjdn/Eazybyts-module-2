
import { Route, Routes } from 'react-router-dom'
import './App.css'

import HomeMain from './pages/login/homemain/HomeMain'
import NavLogin from './pages/loginwithnav/NavLogin'
import NavBuyStock from './pages/bustockwithnav/NavBuyStock'
import NavProfile from './pages/profilewithnav/NavProfile'
import NavSignup from './pages/signupwithnav/NavSignup'
import AfterLogin from './afterLogin/AfterLogin'


function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeMain/>} />
        <Route path='/login' element={<NavLogin/>} />
        <Route path='/signup' element={<NavSignup/>} />
        <Route path='/profile' element={<NavProfile/>} />
        <Route path='/buystock' element={<NavBuyStock/>} />
        <Route path='/navwlogin' element={<AfterLogin/>} />
      </Routes>
      
      
    </div>
    
  )
}

export default App
