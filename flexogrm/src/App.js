import React, { createContext, useState } from 'react'
import Navbar from './components/Navbar'
import "./style/app.scss"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Signup from './components/Signup'
import Signin from './components/Signin'
import Profile from './components/Profile'
import Home from './components/Home'
import CreatPost from './components/CreatPost'
import { LoginContext } from './context/LoginContext';
import Userprofile from './components/Userprofile';
import Modal from './Modal';
import Myfollowingpost from './components/Myfollowingpost';
const App = () => {

  const [userLogin, setuserLogin] = useState(false)
  const [modal, setmodal] = useState(false)
  return (
    <Router>
      <LoginContext.Provider value={{ setuserLogin, setmodal }}>
        <Navbar login={userLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route path='/createpost' element={<CreatPost />} />
          <Route path='/profile/:userid' element={<Userprofile />} />
          <Route path='/myfollowingpost' element={<Myfollowingpost />} />
        </Routes>
        <Toaster />
        {modal && <Modal setmodal={setmodal} />}
      </LoginContext.Provider>
    </Router>
  )
}

export default App