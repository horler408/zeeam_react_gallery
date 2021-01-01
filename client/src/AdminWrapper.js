import React from 'react';
import GradientBar from './components/GradientBar';
import Navbar from './components/Nav';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';


const AdminWrapper = ({ children }) => {

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
          <div>
            <Sidebar />
        </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminWrapper;
