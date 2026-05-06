import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Orders from './pages/Orders';
import List from './pages/List';
import { useContext } from 'react';
import { adminDataContext } from './context/AdminContext';
import NotFound from './pages/NotFound';

const App = () => {
  let { adminData } = useContext(adminDataContext);

  return (
    <>
      {!adminData ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={adminData ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={adminData ? <Navigate to="/" /> : <Login />} />
          <Route path="/addProduct" element={adminData ? <AddProduct /> : <Navigate to="/login" />} />
          <Route path="/orders" element={adminData ? <Orders /> : <Navigate to="/login" />} />
          <Route path="/list" element={adminData ? <List /> : <Navigate to="/login" />} />
          <Route path="*" element={adminData ? <NotFound /> : <Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
