import React from 'react'
import Home from './pages/Home/Home'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='font-Poppins '>
      <Navbar/>
      <main className='min-h-screen max-w-screen-2xl w-auto'>
      <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App