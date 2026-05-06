import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'
import Upload from '../assets/upload.png'
import { useContext, useState } from 'react'
import axios from 'axios'
import { authDataContext } from '../context/AuthConteext'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loading from '../components/Loading'

const AddProduct = () => {
  let [image1, setImage1] = useState(null);
  let [image2, setImage2] = useState(null);
  let [image3, setImage3] = useState(null);
  let [image4, setImage4] = useState(null);
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [price, setPrice] = useState("")
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  let { serverUrl } = useContext(authDataContext);
  let [loading, setLoading] = useState(false);

  // Get image preview URL safely
  const getImagePreview = (imageFile) => {
    return imageFile ? URL.createObjectURL(imageFile) : Upload;
  };

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestSeller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      let result = await axios.post(serverUrl + "/product/addproduct", formData, { withCredentials: true })

      // Reset form
      setName("")
      setDescription("")
      setImage1(null)
      setImage2(null)
      setImage3(null)
      setImage4(null)
      setPrice("")
      setBestSeller(false)
      setCategory("Men")
      setSubCategory("TopWear")
      setSizes([])

      toast.success('Product Added Successfully! ✅', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

    } catch (error) {
      toast.error("Failed to add product! ❌", {
        theme: "dark"
      });
    } finally {
      setLoading(false);
    }
  }

  const imageStates = [image1, image2, image3, image4];
  const imageSetters = [setImage1, setImage2, setImage3, setImage4];

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-x-hidden'>
      <Navbar />
      <Sidebar />

      <div className='w-[82%] h-full flex items-start justify-center absolute right-0 top-20 p-8'>
        <form className='w-full max-w-4xl bg-gradient-to-b from-slate-800/90 to-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-12 gap-8 flex flex-col' onSubmit={handleAddProduct}>

          {/* Header */}
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-[#2c7b89] to-blue-400 bg-clip-text text-transparent drop-shadow-2xl mb-2'>
              Add New Product
            </h1>
            <p className='text-slate-400 text-lg'>Fill in the details to add a new product to your store</p>
          </div>

          {/* Image Upload */}
          <div className='space-y-4'>
            <label className='block text-2xl font-bold text-white drop-shadow-lg'>📸 Product Images</label>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {imageStates.map((image, index) => (
                <label key={index} className='group relative cursor-pointer block p-2 rounded-2xl bg-slate-700/50 backdrop-blur-sm border-2 border-slate-600 hover:border-[#2c7b89]/60 hover:bg-slate-700/70 hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95'>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => imageSetters[index](e.target.files[0])}
                  />
                  <div className='w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300'>
                    <img
                      src={getImagePreview(image)}
                      alt={`Preview ${index + 1}`}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-lg'
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

            {/* Left Column */}
            <div className='space-y-6'>
              <div>
                <label className='block text-xl font-semibold text-white mb-3 drop-shadow-md'>📝 Product Name</label>
                <input
                  type="text"
                  placeholder='Enter product name...'
                  className='w-full h-14 px-6 rounded-2xl bg-slate-700/80 backdrop-blur-sm border-2 border-slate-600 hover:border-[#2c7b89]/60 focus:border-[#2c7b89] focus:outline-none text-xl text-white placeholder-slate-400 transition-all duration-300 shadow-xl hover:shadow-2xl'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className='block text-xl font-semibold text-white mb-3 drop-shadow-md'>💬 Description</label>
                <textarea
                  placeholder='Enter product description...'
                  className='w-full h-32 px-6 py-4 rounded-2xl bg-slate-700/80 backdrop-blur-sm border-2 border-slate-600 hover:border-[#2c7b89]/60 focus:border-[#2c7b89] focus:outline-none text-lg text-white placeholder-slate-400 resize-vertical transition-all duration-300 shadow-xl hover:shadow-2xl'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className='block text-xl font-semibold text-white mb-3 drop-shadow-md'>💰 Price</label>
                <div className='relative'>
                  <span className='absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-[#2c7b89] font-bold'>₹</span>
                  <input
                    type="number"
                    placeholder='1000'
                    className='w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-700/80 backdrop-blur-sm border-2 border-slate-600 hover:border-[#2c7b89]/60 focus:border-[#2c7b89] focus:outline-none text-xl text-white placeholder-slate-400 transition-all duration-300 shadow-xl hover:shadow-2xl'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-6'>
              <div>
                <label className='block text-xl font-semibold text-white mb-3 drop-shadow-md'>🏷️ Category</label>
                <select
                  className='w-full h-14 px-6 rounded-2xl bg-slate-700/80 backdrop-blur-sm border-2 border-slate-600 hover:border-[#2c7b89]/60 focus:border-[#2c7b89] focus:outline-none text-xl text-white transition-all duration-300 shadow-xl hover:shadow-2xl appearance-none bg-no-repeat bg-right'
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div>
                <label className='block text-xl font-semibold text-white mb-3 drop-shadow-md'>📂 Sub-Category</label>
                <select
                  className='w-full h-14 px-6 rounded-2xl bg-slate-700/80 backdrop-blur-sm border-2 border-slate-600 hover:border-[#2c7b89]/60 focus:border-[#2c7b89] focus:outline-none text-xl text-white transition-all duration-300 shadow-xl hover:shadow-2xl appearance-none bg-no-repeat bg-right'
                  onChange={(e) => setSubCategory(e.target.value)}
                  value={subCategory}
                >
                  <option value="TopWear">TopWear</option>
                  <option value="BottomWear">BottomWear</option>
                  <option value="WinterWear">WinterWear</option>
                </select>
              </div>

              <div>
                <label className='block text-xl font-semibold text-white mb-3 drop-shadow-md'>📏 Available Sizes</label>
                <div className='flex flex-wrap gap-3'>
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      type='button'
                      className={`px-6 py-3 rounded-2xl text-lg font-semibold border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${sizes.includes(size)
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-400 shadow-emerald-500/25 hover:shadow-emerald-400/50'
                          : 'bg-slate-700/60 border-slate-600 hover:border-[#2c7b89]/60 hover:bg-slate-700 text-white shadow-slate-500/25'
                        }`}
                      onClick={() => setSizes(prev =>
                        prev.includes(size)
                          ? prev.filter(item => item !== size)
                          : [...prev, size]
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Best Seller Checkbox - FIXED */}
          <div className='flex items-center gap-4 pt-4 border-t border-slate-700/50'>
            <label htmlFor="bestSellerCheckbox" className='flex items-center gap-3 cursor-pointer group'>
              <input
                type="checkbox"
                id="bestSellerCheckbox"
                className='sr-only peer'
                checked={bestSeller}
                onChange={(e) => setBestSeller(e.target.checked)}
              />
              <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 shadow-lg peer-checked:bg-gradient-to-r peer-checked:from-yellow-400 peer-checked:to-orange-500 peer-checked:border-yellow-400 peer-checked:shadow-yellow-500/50 hover:border-[#2c7b89]/60 bg-slate-800/50 group-hover:border-[#2c7b89]/60`}>
                {bestSeller && (
                  <svg className="w-5 h-5 text-black drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className='text-xl font-semibold text-white group-hover:text-[#2c7b89] transition-colors'>⭐ Mark as Best Seller</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='group w-full h-16 bg-gradient-to-r from-[#2c7b89] to-blue-600 hover:from-[#1e5f6a] hover:to-blue-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed rounded-3xl text-2xl font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden'
          >
            {loading ? (
              <>
                <Loading />
                <span>Adding Product...</span>
              </>
            ) : (
              <>
                <svg className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Product
              </>
            )}
            <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700' />
          </button>
        </form>
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

export default AddProduct