
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Booking from './components/Booking'
import Approval from './components/Approval'
import ThankYou from './components/ThankYou'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Booking />} />
        <Route path='/requests' element={<Approval />} />
        <Route path='thankyou' element={<ThankYou />} />
      </Routes>
    </>
  )
}

export default App
