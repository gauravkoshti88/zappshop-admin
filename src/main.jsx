import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HashRouter} from 'react-router-dom'
import AuthConteext from './context/AuthConteext.jsx'
import AdminContext from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AuthConteext>
      <AdminContext>
        <App />
      </AdminContext>
    </AuthConteext>
  </HashRouter>,
)
