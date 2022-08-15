import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './pages/Intro'
import Home from './pages/Home'
import Join from './pages/Join'
import Partners from './pages/Partners'
import Staff from './pages/Staff'
import Identification from './pages/Identification'
import Admin from './pages/Admin'
import 'antd/dist/antd.min.css';
import AuthContextProvider from './context/AuthContext'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/identification" element={<Identification />} />              
        <Route path="/admin" element={<AuthContextProvider><Admin /></AuthContextProvider>} />        
      </Routes>
    </BrowserRouter>
  )
}

export default App
