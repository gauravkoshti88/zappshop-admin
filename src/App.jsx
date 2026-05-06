import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import Orders from './pages/Orders'
import List from './pages/List'
import { useContext } from 'react'
import { adminDataContext } from './context/AdminContext'
import NotFound from './pages/NotFound'

const App = () => {
  let {adminData} = useContext(adminDataContext)
  let navigate = useNavigate();
  return (
    <>
      {!adminData ? <Login/> : <>
        <Routes>
        <Route path='/' element={adminData && <Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/addProduct' element={<AddProduct/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/list' element={<List/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes> 
      </>}
    </>
  )
}

export default App
