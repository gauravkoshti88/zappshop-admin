import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Loading from '../components/Loading'
import { authDataContext } from '../context/AuthConteext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const {serverUrl} = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const [products, orders] = await Promise.all([
        axios.get(serverUrl+"/product/listproduct",{},{withCredentials:true}),
        axios.post(serverUrl+"/order/allorders",{},{withCredentials:true})
      ]);
      setTotalProducts(products.data.length)
      setTotalOrders(orders.data.length)
    } catch (error) {
      navigate("/")
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchCounts()
  },[])

  const StatsCard = ({ title, count, icon: Icon, color }) => (
    <div className='group relative w-full max-w-md h-52 bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-2 active:scale-[0.98] transition-all duration-500 cursor-pointer overflow-hidden'>
      {/* Background shimmer */}
      <div className='absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 -skew-x-12 transform -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 opacity-75' />
      
      {/* Icon */}
      <div className={`w-20 h-20 bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl group-hover:rotate-6 transition-all duration-500 drop-shadow-2xl`}>
        <Icon className="w-10 h-10 text-white drop-shadow-lg" />
      </div>
      
      {/* Content */}
      <div className='flex flex-col items-center gap-2 z-10 relative'>
        <span className='text-4xl font-black text-white drop-shadow-xl tracking-wide'>{count}</span>
        <h3 className='text-lg font-semibold bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent drop-shadow-md'>{title}</h3>
      </div>
      
      {/* Bottom glow */}
      <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-32 ${color.replace('to-', 'from-')} rounded-full blur-3xl opacity-30 animate-pulse`} />
    </div>
  );
  
  if (loading) {
    return (
      <div className='w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-6 p-12 bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20'>
          <Loading />
          <p className='text-2xl font-bold text-white drop-shadow-xl'>Loading Dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-x-hidden'>
      <Navbar/>
      <SideBar/>
      
      <div className='w-[70vw] h-full absolute left-[25%] flex flex-col items-start justify-start gap-12 py-28 px-8'>
        {/* Header */}
        <div className='flex flex-col items-start gap-4 w-full'>
          <h1 className='text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-[#2c7b89] to-blue-400 bg-clip-text text-transparent drop-shadow-2xl leading-tight'>
            Admin Dashboard
          </h1>
          <p className='text-xl text-slate-300 font-medium backdrop-blur-sm drop-shadow-md'>Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full'>
          <StatsCard 
            title="Total Products" 
            count={totalProducts}
            icon={({className}) => (
              <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10v3m-8 4l-8-4m0 0l-8 4m8-4V7" />
              </svg>
            )}
            color="from-emerald-500 to-emerald-600"
          />
          
          <StatsCard 
            title="Total Orders" 
            count={totalOrders}
            icon={({className}) => (
              <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9.5A2 2 0 007.4 22h9.2a2 2 0 001.9-1.5L19 13m-8 0a2 2 0 012 2v2a2 2 0 01-2 2m0 0V13m0 0V9a2 2 0 012-2m-2 2h4a2 2 0 012 2v2a2 2 0 01-2 2m0 0h+2" />
              </svg>
            )}
            color="from-blue-500 to-indigo-600"
          />
        </div>
      </div>
    </div>
  )
}

export default Home