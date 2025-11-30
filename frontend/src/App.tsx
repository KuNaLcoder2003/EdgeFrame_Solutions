
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import { ReactLenis } from 'lenis/react'
import BookConsultation from './pages/Bookings'

function App() {



  return (
    <Routes>
      <Route path='/' element={<>
        <ReactLenis root />
        <LandingPage />
      </>} />
      <Route path='/book' element={<BookConsultation />} />
    </Routes>
  )
}

export default App
