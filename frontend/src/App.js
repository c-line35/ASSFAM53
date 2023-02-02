import { Routes, Route, BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/style.css';
import AuthContextProvider from './context/AuthContext'
import UsersContextProvider from './context/UsersContext'

import Intro from './pages/Intro'
import Home from './pages/Home'
import Join from './pages/Join'
import Partners from './pages/Partners'
import Staff from './pages/Staff'
import InitPassword from './pages/InitPassword';
import Manage from './pages/admin/Manage';
import Offers from './pages/Offers';
import Profil from './pages/Profil';
import StaffContextProvider from './context/StaffContext';




const App = () => {
  return (
    <AuthContextProvider>
    <UsersContextProvider>
    <StaffContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/offers" element={<Offers />} />                 
        <Route path="/initpassword" element={<InitPassword /> } /> 
        <Route path="/management" element={<Manage /> } /> 
        <Route path="/profil" element={<Profil /> } /> 
     
      </Routes>
    </BrowserRouter> 
    </StaffContextProvider> 
    </UsersContextProvider>
    </AuthContextProvider>
  )
}

export default App
