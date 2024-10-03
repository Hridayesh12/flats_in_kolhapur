import React, { useEffect, useRef, useState } from 'react';
import NavBar from './main/NavBar';
import Footer from './main/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [outletHeight, setOutletHeight] = useState('auto');
  const footerRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      calculateOutletHeight();
      document.body.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    const calculateOutletHeight = () => {
      const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;
      const footerHeight = footerRef.current ? footerRef.current.offsetHeight : 0;
      const remainingHeight = window.innerHeight - navbarHeight - footerHeight;

      setOutletHeight(remainingHeight > 0 ? `${remainingHeight}px` : '0px');
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex flex-col items-center max-w-[2000px] mx-auto' style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
      <div ref={navbarRef} className='w-full'>
        <NavBar />
      </div>
      <div
        className='flex-grow w-full'
        style={{ height: outletHeight }}
      >
        <Outlet />
      </div>
      <div className='w-full flex sm:hidden' ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
