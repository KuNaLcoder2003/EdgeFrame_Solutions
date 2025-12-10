
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Booking from './components/Booking'
import Approval from './components/Approval'
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Booking />} />
        <Route path='/requests' element={<Approval />} />
      </Routes>
    </>
  )
}

export default App
