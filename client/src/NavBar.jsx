import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Upload from './components/UploadFile'
import Dashboard from './home'
import Viewdata from './components/ViewData'

export default function NavBar() {
  return (
    <div>
        <Routes>
            {/* <Route path="/" element={<Login/>}/> */}
            <Route path="/upload" element={<Upload/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/view" element={<Viewdata/>}/>
        </Routes>
    </div>
  )
}
