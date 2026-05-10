import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useContext } from 'react';
import { adminDataContext } from '../context/AdminContext';
import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';

const Navbar = () => {
    let navigate = useNavigate();
    let { serverUrl, setAdminData } = useContext(adminDataContext)

    const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl + '/api/logout', { withCredentials: true })
            setAdminData(null)
            navigate("/login")
        } catch (error) {
            navigate("/")
        }
    }
    return (
        <>
            <div className='w-full h-17.5 bg-gradient-to-r from-slate-50 via-white to-slate-50/80 backdrop-blur-md z-50 fixed top-0 flex items-center justify-between px-7.5 overflow-x-hidden shadow-2xl shadow-black/10 border-b border-gray-200/50'>

                <div className='w-[30%] flex items-center justify-start gap-1 cursor-pointer group' onClick={() => navigate("/")}>
                    <img src={Logo} alt="Logo" className='w-11 h-11 sm:w-15 sm:h-15 object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300' />
                    <div className='flex flex-col'>
                        <h1 className=' sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300'>ZappShop</h1>
                        <span className='text-xs font-medium text-gray-500 tracking-wider'>Admin Dashboard</span>
                    </div>
                </div>
                <button
                    className='group relative text-sm font-semibold bg-gradient-to-r from-gray-700/90 to-gray-600/90 backdrop-blur-sm py-2 px-4 rounded-3xl text-white shadow-2xl hover:shadow-3xl hover:scale-105 hover:from-gray-800/95 hover:to-gray-700/95 active:scale-95 active:shadow-xl border border-gray-200/30 hover:border-gray-300/50 transition-all duration-300 overflow-hidden'
                    onClick={handleLogout}
                >
                    <span className='relative z-10 flex items-center gap-2'>
                        {/* ✅ React Icon instead of SVG */}
                        <IoLogOutOutline
                            className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-red-600 transition-all duration-300"
                        />
                        <span className='hidden sm:block font-semibold text-gray-100'>Logout</span>
                    </span>

                    <div className='absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-3xl blur-sm' />
                </button>
            </div>
        </>
    )
}

export default React.memo(Navbar);