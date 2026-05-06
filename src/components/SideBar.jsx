import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegRectangleList } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import {useNavigate} from 'react-router-dom'
import React from "react";

const SideBar = () => {
    let navigate = useNavigate();
  return (
    <div className='w-[18%] min-h-screen bg-gradient-to-b from-slate-50 via-white to-gray-50 border-r border-gray-200 shadow-2xl fixed left-0 top-0 z-40 backdrop-blur-sm pt-10'>
        <div className='flex flex-col gap-3 pt-12 pl-[20%] text-[15px]'>
            <div className='group flex items-center justify-center md:justify-start gap-4 bg-white/80 backdrop-blur-sm border border-gray-200/70 border-r-0 rounded-2xl px-5 py-4 mx-2 cursor-pointer hover:bg-gradient-to-r hover:from-[#2c7b89]/10 hover:to-[#1e5f6a]/10 hover:border-[#2c7b89]/40 hover:shadow-2xl hover:scale-[1.02] hover:rotate-1 active:scale-[0.98] transition-all duration-300 shadow-lg' onClick={()=>navigate("/addProduct")}>
                <div className='w-12 h-12 bg-gradient-to-br from-[#2c7b89] to-[#1e5f6a] rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-300'>
                    <IoMdAddCircleOutline className="w-6 h-6 text-white drop-shadow-md"/>
                </div>
                <p className="font-semibold text-gray-800 hidden md:block group-hover:text-[#2c7b89] transition-all duration-300">Add Items</p>
            </div>

            <div className='group flex items-center justify-center md:justify-start gap-4 bg-white/80 backdrop-blur-sm border border-gray-200/70 border-r-0 rounded-2xl px-5 py-4 mx-2 cursor-pointer hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-emerald-600/10 hover:border-emerald-400/40 hover:shadow-2xl hover:scale-[1.02] hover:rotate-1 active:scale-[0.98] transition-all duration-300 shadow-lg' onClick={()=>navigate("/list")}>
                <div className='w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-300'>
                    <FaRegRectangleList className="w-6 h-6 text-white drop-shadow-md"/>
                </div>
                <p className="font-semibold text-gray-800 hidden md:block group-hover:text-emerald-600 transition-all duration-300">List Items</p>
            </div>

            <div className='group flex items-center justify-center md:justify-start gap-4 bg-white/80 backdrop-blur-sm border border-gray-200/70 border-r-0 rounded-2xl px-5 py-4 mx-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-600/10 hover:border-blue-400/40 hover:shadow-2xl hover:scale-[1.02] hover:rotate-1 active:scale-[0.98] transition-all duration-300 shadow-lg' onClick={()=>navigate("/orders")}>
                <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-300'>
                    <SiTicktick className="w-6 h-6 text-white drop-shadow-md"/>
                </div>
                <p className="font-semibold text-gray-800 hidden md:block group-hover:text-blue-600 transition-all duration-300">View Orders</p>
            </div>
        </div>
        
    </div>
  )
}

export default React.memo(SideBar)