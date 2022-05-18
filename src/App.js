import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './pages/Intro'
import Home from './pages/Home'
import Join from './pages/Join'
import Partners from './pages/Partners'
import Staff from './pages/Staff'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
