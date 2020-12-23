import React, { useState, useEffect } from 'react';
import GradientBar from './components/GradientBar';
import Navbar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Preloader from './components/common/Preloader';


const AdminWrapper = ({ children }) => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false)
    })
  })

  return (
    <>
      {loading && <Preloader />}
      <GradientBar />
      <div className="flex">
        <div>
          <div>
            <Navbar />
          </div>
          <div>
            {children}
          </div>
          <div className="sm:w-64 px-4 sm:px-8 pt-6 bg-white">
            <Sidebar />
        </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminWrapper;
