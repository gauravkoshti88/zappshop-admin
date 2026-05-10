import { useCallback, useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'
import { authDataContext } from '../context/AuthConteext';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loading from '../components/Loading';

const List = () => {
  let [list, setList] = useState([]);
  let [loading, setLoading] = useState(false);
  let [searchTerm, setSearchTerm] = useState('');
  let { serverUrl } = useContext(authDataContext)

  const fetchList = useCallback(async () => {
    setLoading(true)
    try {
      let result = await axios.get(serverUrl + '/product/listproduct', { withCredentials: true });
      setList(result.data)
      console.log(result.data);

    } catch (error) {
      toast.error("Failed to fetch products! ❌", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  }, [serverUrl])

  const removeItem = useCallback(async (id) => {
    try {
      await axios.post(`${serverUrl}/product/removeproduct/${id}`, {}, { withCredentials: true });
      toast.success('Product Removed Successfully! ✅', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
      fetchList();
    } catch (error) {
      toast.error("Failed to remove product! ❌", { theme: "dark" });
    }
  }, [serverUrl, fetchList])

  useEffect(() => {
    fetchList();
  }, [fetchList])

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden'>
      <Navbar />

      <div className='w-full h-full flex flex-col lg:flex-row'>
        <Sidebar />

        <div className='w-full lg:w-[82%] lg:ml-72 flex-1 mt-4 lg:mt-20 flex flex-col gap-6 lg:gap-8 overflow-x-hidden py-6 lg:py-12 px-4 lg:px-8 pt-16 sm:pt-15 lg:pt-2'>

          {/* Header & Search */}
          <div className='w-full flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='w-full lg:w-auto'>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-[#2c7b89] to-blue-400 bg-clip-text text-transparent drop-shadow-2xl mb-1 lg:mb-2'>
                Products Inventory
              </h1>
              <p className='text-slate-400 text-base sm:text-lg'>Manage all your listed products</p>
            </div>

            <div className='w-full lg:w-80 relative'>
              <input
                type="text"
                placeholder="Search products..."
                className='w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-4 sm:pr-6 rounded-2xl bg-slate-700/80 backdrop-blur-sm border-2 border-slate-600 hover:border-[#2c7b89]/60 focus:border-[#2c7b89] focus:outline-none text-lg sm:text-xl text-white placeholder-slate-400 transition-all duration-300 shadow-xl hover:shadow-2xl py-2'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Products List - SMALL IMAGES */}
          <div className='w-full flex flex-col gap-3 sm:gap-4'>

            {loading ? (
              <div className='w-full flex flex-col items-center justify-center py-16 sm:py-20 gap-4 sm:gap-6'>
                <Loading />
                <p className='text-lg sm:text-xl text-slate-400 font-medium'>Loading products...</p>
              </div>
            ) : filteredList.length > 0 ? (
              filteredList.map((item) => (
                <div
                  key={item._id}
                  className='group w-full bg-gradient-to-r from-slate-800/90 via-slate-800/70 to-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 shadow-xl sm:shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-400 overflow-hidden flex flex-col sm:flex-row sm:items-center sm:gap-4 h-auto py-4'
                >
                  {/* Image */}
                  <div className='w-24 h-24 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex-shrink-0 mx-auto sm:mx-0 rounded-xl overflow-hidden bg-slate-700/50 group-hover:scale-105 transition-transform duration-300 shadow-lg mb-3 sm:mb-0'>
                    <img
                      src={item?.image1?.url}
                      alt={item.name}
                      className='w-full h-full object-cover group-hover:brightness-110 transition-all duration-300'
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/64x64/4a5568/9ca3af?text=?';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className='w-full flex flex-col items-center text-center sm:flex-1 sm:flex-row sm:items-center sm:justify-between sm:text-left gap-2'>
                    <div className='sm:flex-1 min-w-0'>
                      <h3 className='text-base sm:text-lg font-bold text-white line-clamp-2 sm:line-clamp-1 drop-shadow-lg group-hover:text-[#2c7b89] transition-colors mb-2 sm:mb-0'>
                        {item.name}
                      </h3>

                      <div className='flex flex-wrap gap-2 mb-2 text-xs sm:text-sm text-slate-400 justify-center sm:justify-start'>
                        <span className='px-2 py-1 bg-slate-700/60 rounded-lg'>{item.category}</span>
                        <span className='px-2 py-1 bg-slate-700/60 rounded-lg'>{item.subCategory}</span>
                      </div>
                    </div>

                    <div className='flex flex-col sm:flex-row sm:items-center sm:gap-3'>
                      <div className='text-lg sm:text-xl font-black bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-xl'>
                        ₹{item.price}
                      </div>
                    </div>
                  </div>

                  {/* Best Seller Badge */}
                  {item.bestSeller && (
                    <div className='w-full sm:w-auto self-center sm:self-end mb-2 sm:mb-0'>
                      <div className='px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full shadow-lg'>
                        ⭐ BEST
                      </div>
                    </div>
                  )}

                  {/* Delete Button */}
                  <div className='w-full sm:w-auto flex justify-center sm:justify-end mt-2 sm:mt-0'>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item._id);
                      }}
                      className='w-12 h-12 bg-gradient-to-br from-red-500/90 to-red-600/90 rounded-2xl border-2 border-white/20 shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center'
                      title="Delete Product"
                    >
                      <svg className="w-5 h-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className='w-full flex flex-col items-center justify-center py-16 sm:py-24 text-center bg-slate-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border-2 border-dashed border-slate-600 px-4'>
                <svg className="w-20 h-20 sm:w-24 sm:h-24 text-slate-500 mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className='text-xl sm:text-2xl font-bold text-white mb-2'>No Products Found</h3>
                <p className='text-slate-400 text-sm sm:text-base mb-4 sm:mb-6'>Your inventory is empty. Add some products to get started!</p>
              </div>
            )}
          </div>

          {/* Stats Footer */}
          {!loading && (
            <div className='w-full text-center py-6 text-sm text-slate-500 border-t border-slate-700/50 mt-6 lg:mt-8'>
              Showing {filteredList.length} of {list.length} products
              {searchTerm && ` • Searched: "${searchTerm}"`}
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

export default List