import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { useContext, useState } from 'react';
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { authDataContext } from '../context/AuthConteext';
import { adminDataContext } from '../context/AdminContext';

const Login = () => {
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("")
  let { serverUrl } = useContext(authDataContext);
  let {adminData, getAdminData} = useContext(adminDataContext);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(serverUrl + '/api/adminlogin', {
        email, password
      }, { withCredentials: true })

      getAdminData()
      navigate('/')
      toast.success(`${data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(`${error.response.data.message} ⚠️`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <div className='w-full h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
      <div className='w-full h-15 flex items-center justify-start px-2 py-2.5 cursor-pointer' onClick={() => navigate('/')} >
        <img className='w-20' src={Logo} alt="logo" />
        <h1 className='-ml-3.5'>ZappShop-Admin</h1>
      </div>

      <div className='w-full h-25 flex items-center justify-center flex-col gap-2'>
        <span className='text-[20px] font-semibold'>Admin Login Page</span>
        <span className='text-[14px] '>Welcome to ZappShop-Admin, Apply to Admin Login</span>
      </div>

      <div className='max-w-150 w-[90%] h-90 bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex item-center justify-center'>
        <form className='w-[90%] h-[80%] flex flex-col items-center justify-start gap-5 mt-6' onSubmit={handleAdminLogin}>
          
          <div className='w-[90%] h-100 flex flex-col items-center justify-center gap-3.75 relative'>

            <input type="Email" className='w-full h-12.5 border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-5 font-semibold' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />

            <input type={show ? "text" : "password"} className='w-full h-12.5 border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-5 font-semibold' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />

            {!show && <IoEyeOutline className='w-5 h-5 absolute cursor-pointer right-5 top-30.5' onClick={() => setShow(prev => !prev)} />}

            {<IoMdEye className='w-5 h-5 absolute cursor-pointer right-5 top-30.5' onClick={() => setShow(prev => !prev)} />}

            <button className='w-full h-12.5 bg-[#6060f5] rounded-lg flex flex-center items-center justify-center mt-5 text-[17px] font-semibold'>Login</button>

          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
