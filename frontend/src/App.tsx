
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import { ReactLenis } from 'lenis/react'
import BookConsultation from './pages/Bookings'
// import HeroSection from './pages/Temp'
// import IntegratedShaderHero from './pages/Temp1'
// import MinimalistHeroDemo from './pages/Temp2'

function App() {



  return (
    <Routes>
      <Route path='/' element={<>
        <ReactLenis root />
        <LandingPage />
      </>} />
      <Route path='/book' element={<BookConsultation />} />
      {/* <Route path='/temp' element={<HeroSection />} />
      <Route path='/temp1' element={<IntegratedShaderHero />} />
      <Route path='/temp2' element={<MinimalistHeroDemo />} /> */}
    </Routes>
  )
}

export default App
