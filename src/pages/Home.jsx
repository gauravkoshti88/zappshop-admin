import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Loading from '../components/Loading'
import { authDataContext } from '../context/AuthConteext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard';

const Home = () => {  
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex'>
      {/* Sidebar fixed */}
      <SideBar/>

      {/* Main Content with scroll */}
      <div className='flex-1 min-h-screen overflow-y-auto'>
        <Navbar/>
        
        <div className='flex flex-col gap-5'>
          {/* Main Dashboard */}
          <div className='w-full pt-15 lg:pl-5'>
            <AdminDashboard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
