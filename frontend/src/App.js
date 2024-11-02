import { Routes, Route, BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/style.css';
import AuthContextProvider from './context/AuthContext'
import UsersContextProvider from './context/UsersContext'
import StaffContextProvider from './context/StaffContext';
import ArticlesContextProvider from './context/ArticlesContext';
import EventContextProvider from './context/EventContext';
import LibraryContextProvider from './context/LibraryContext'
import BookContextProvider from './context/BookContext';

import Intro from './pages/Intro'
import Home from './pages/Home'
import Join from './pages/Join'
import Partners from './pages/Partners';
import Library from './pages/Library';
import Staff from './pages/Staff'
import InitPassword from './pages/InitPassword';
import Manage from './pages/admin/Manage';
import Offers from './pages/Offers';
import Profil from './pages/Profil';
import ArticlesPage from './pages/admin/ArticlesPage';
import EventsPage from './pages/admin/EventsPage';
import { ConfigProvider } from 'antd';
import frFR from 'antd/es/locale/fr_FR';
import LibraryPage from './pages/admin/LibraryPage';


const App = () => {
  return (
    <ConfigProvider locale={frFR}>
    <AuthContextProvider>
    <UsersContextProvider>
    <StaffContextProvider>
    <ArticlesContextProvider>
    <EventContextProvider>
    <LibraryContextProvider>
    <BookContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/library" element={<Library />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/offers" element={<Offers />} />                 
        <Route path="/initpassword/:token" element={<InitPassword /> } /> 
        <Route path="/management" element={<Manage /> } /> 
        <Route path="/profil" element={<Profil /> } /> 
        <Route path="/adminarticles" element={<ArticlesPage/> } /> 
        <Route path="/adminevent" element={<EventsPage/> } />
        <Route path="/adminLibrary" element={<LibraryPage/> } /> 
      </Routes>
    </BrowserRouter>
    </BookContextProvider>
    </LibraryContextProvider>
    </EventContextProvider>
    </ArticlesContextProvider>
    </StaffContextProvider> 
    </UsersContextProvider>
    </AuthContextProvider>
    </ConfigProvider>
  )
}

export default App
