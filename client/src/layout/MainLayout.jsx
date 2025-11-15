import React from 'react'
import Navbar from '../components/user-components/Navbar'
import { Outlet } from 'react-router-dom'
import ButtomNav from '../components/user-components/ButtomNav'

function MainLayout() {
  return (
    <div>
        <Outlet />
        <ButtomNav />
    </div>
  )
}

export default MainLayout