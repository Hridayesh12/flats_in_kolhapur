import React, { useEffect } from 'react';
import NavBar from './main/NavBar';
import Footer from './main/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  useEffect(() => {
    const handleResize = () => {
      document.body.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex flex-col items-center max-w-[2000px] mx-auto' style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
      <NavBar />
      <div className='flex-grow w-full'>
        <Outlet />
      </div>
     <div className='w-full flex sm:hidden'>
       <Footer />
     </div>
    </div>
  );
}

export default Layout;
