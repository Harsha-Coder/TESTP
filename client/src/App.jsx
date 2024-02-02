// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//import NavBar from './NavBar'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Dashboard from './home'
import Login from './login'
import Profile from './profile'
import Upload from './Upload'
import Viewdata from './ViewData'

function App() {


  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/view" element={<Viewdata/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
