import React, { useState, useEffect } from 'react';
import GradientBar from './components/GradientBar';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
//import Preloader from './components/common/Preloader';


const AppWrapper = ({ children }) => {

  //const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   window.addEventListener("load", () => {
  //     setLoading(false)
  //   })
  // })

  return (
    <>
      <GradientBar />
      <div className="flex">
        <div>
          <div>
            <Navbar />
          </div>
          <div>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppWrapper;
