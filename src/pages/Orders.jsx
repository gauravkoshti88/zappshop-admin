import { useContext } from 'react'
import { authDataContext } from '../context/AuthConteext'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { SiEbox } from "react-icons/si";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loading from '../components/Loading';

const Orders = () => {
  let { serverUrl } = useContext(authDataContext);
  let [orders, setOrders] = useState([]);
  let [loading, setLoading] = useState(false)

  const allOrders = async () => {
    setLoading(true)
    try {
      let result = await axios.post(serverUrl + "/order/allorders", {}, { withCredentials: true })
      if (result.data) {
        setOrders((result.data).reverse())
      }
    } catch (error) {
      toast.error("Orders List Failed ❌", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        serverUrl + "/order/updatestatus",
        { orderId, status: e.target.value },
        { withCredentials: true }
      );

      toast.success('Status Updated Successfully! ✅', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });

      // ✅ Turant local state update
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId
            ? {
              ...order,
              status: e.target.value,
              payment: e.target.value === "Delivered" ? true : order.payment,
              paymentMethod: result.data.paymentMethod || order.paymentMethod
            }
            : order
        )
      );
      allOrders()
    } catch (error) {
      toast.error("Status Update Failed! ❌");
    }
  };

  console.log(orders);


  useEffect(() => {
    allOrders()
  }, [])

  const getStatusColor = (status) => {
    const colors = {
      "Order Placed": "from-orange-500 to-orange-600",
      "Packing": "from-blue-500 to-blue-600",
      "Shipped": "from-purple-500 to-purple-600",
      "Out for delivery": "from-yellow-500 to-yellow-600",
      "Delivered": "from-emerald-500 to-emerald-600"
    };
    return colors[status] || "from-slate-500 to-slate-600";
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden'>
      <Navbar />

      <div className='w-full flex flex-col lg:flex-row min-h-screen'>
        <SideBar className="w-full lg:w-[18%]" />

        {/* Orders Section */}
        <div className={`w-full flex flex-col items-center gap-6 pt-20 px-4 lg:pl-[20%] lg:pr-8 transition-all duration-300 pb-20 sm:pb-10 ${loading ? 'blur-sm' : ''
          }`}>

          {/* Header */}
          <div className='w-full max-w-7xl flex flex-col items-center gap-3 mb-2'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-[#2c7b89] to-blue-400 bg-clip-text text-transparent drop-shadow-2xl text-center'>
              Orders Management
            </h1>
            <p className='text-slate-400 text-lg text-center'>Track and update order status in real-time</p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className='w-full max-w-4xl flex flex-col items-center justify-center py-24 gap-6'>
              <Loading />
              <p className='text-xl text-slate-400 font-medium backdrop-blur-sm px-6 py-3 rounded-2xl bg-slate-800/50 border border-slate-700/50'>
                Loading Orders...
              </p>
            </div>
          ) : orders.length > 0 ? (
            <div className='w-full max-w-6xl space-y-4'>
              {orders.map((order, index) => (
                <div
                  key={order._id || index}
                  className='group w-full bg-gradient-to-r from-slate-800/90 via-slate-800/70 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/10 shadow-2xl hover:shadow-3xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 overflow-hidden cursor-pointer'
                >
                  {/* Shimmer Background */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl blur-sm pointer-events-none' />

                  <div className='relative z-10 grid grid-cols-1 lg:grid-cols-5 items-start lg:items-center gap-4 lg:gap-6'>

                    <div className='flex flex-wrap gap-2 lg:gap-3'>
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className='w-20 h-25 lg:w-20 lg:h-25 bg-gradient-to-br from-white/20 to-slate-200/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 overflow-hidden'
                        >
                          <img
                            src={item?.image1?.url}
                            alt={item.name || "Product"}
                            className='w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500'
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/64x64/4a5568/9ca3af?text=?';
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Items */}
                    <div className='lg:col-span-2 flex flex-col gap-2 text-sm lg:text-base text-slate-300 lg:text-[#56dbfc] line-clamp-3 lg:line-clamp-2'>
                      {order.items.map((item, i) => (
                        <div key={i} className='group/item flex items-center gap-2 p-2 rounded-xl bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-200'>
                          <div className='w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex-shrink-0' />
                          <span className='font-medium text-slate-200'>{item.name}</span>
                          <span className='text-slate-400'>×{item.quantity}</span>
                          <span className='text-slate-400'>({item.size})</span>
                        </div>
                      ))}
                    </div>

                    {/* Address */}
                    <div className='text-xs lg:text-sm text-slate-400 lg:text-green-200 space-y-1 lg:col-span-1'>
                      <p className='font-semibold text-slate-200 truncate'>{order.address.firstName} {order.address.lastName}</p>
                      <p className='truncate'>{order.address.city}, {order.address.state}</p>
                      <p className='text-emerald-400 font-medium'>{order.address.phone}</p>
                    </div>

                    {/* Order Info */}
                    <div className='text-xs lg:text-sm text-slate-400 space-y-1 lg:col-span-1 flex-shrink-0'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='px-2 py-1 bg-slate-700/60 backdrop-blur-sm rounded-xl text-xs'>Items: {order.items.length}</span>
                        <span
                          className={`px-2 py-1 bg-gradient-to-r ${order.payment
                            ? 'from-emerald-500/80 to-emerald-600/80 text-emerald-900'
                            : 'from-red-500/80 to-red-600/80 text-red-900'
                            } rounded-xl text-xs font-medium`}
                        >
                          {order.payment
                            ? `✅ Paid (${order.paymentMethod || ''})`
                            : '⏳ Pending'}
                        </span>

                      </div>
                      <p className='text-xs opacity-75'>{new Date(order.date).toLocaleDateString('en-IN')}</p>
                      <p className='text-2xl lg:text-3xl font-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl'>
                        ₹{order.amount}
                      </p>
                    </div>

                    {/* Status Dropdown */}
                    <div className='flex gap-5 lg:w-32'>
                      <span className='text-md text-slate-400 font-medium hidden lg:block whitespace-nowrap'>Status:</span>
                      <select
                        value={order.status}
                        disabled={order.status == "Delivered"}
                        className={`px-2 py-2 lg:py-2 bg-gradient-to-r ${getStatusColor(order.status)} text-white font-semibold rounded-2xl border-2 border-white/30 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/20 focus:scale-105 active:scale-98 transition-all duration-300 text-sm lg:text-base capitalize tracking-wide`}
                        onChange={(e) => statusHandler(e, order._id)}
                      >
                        <option className='bg-slate-800 text-white capitalize' value="Order Placed">Order Placed</option>
                        <option className='bg-slate-800 text-white capitalize' value="Packing">Packing</option>
                        <option className='bg-slate-800 text-white capitalize' value="Shipped">Shipped</option>
                        <option className='bg-slate-800 text-white capitalize' value="Out for delivery">Out for delivery</option>
                        <option className='bg-slate-800 text-white capitalize' value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
              }
            </div>
          ) : (
            <div className='w-full max-w-2xl flex flex-col items-center justify-center py-24 gap-6 text-center bg-slate-800/50 backdrop-blur-xl rounded-3xl border-2 border-slate-700/50 shadow-2xl'>
              <div className='w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl flex items-center justify-center shadow-2xl'>
                <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className='text-2xl font-bold text-white mb-2 drop-shadow-lg'>No Orders Yet</h3>
                <p className='text-slate-400 text-lg'>Your store hasn't received any orders yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        theme="dark"
        transition={Bounce}
      />
    </div>
  )
}

export default Orders