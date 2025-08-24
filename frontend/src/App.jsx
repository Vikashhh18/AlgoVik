import React from 'react';
import Home from './pages/Home/Home';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='font-Poppins min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full">
        <main className='min-h-[calc(100vh-4rem)] w-full'>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
