import React, { useEffect, useRef, useState } from 'react';
import TypeFilters from '../components/homepage/TypeFilters';
import ConfigFilters from '../components/homepage/ConfigFilters';
import DropDownFilter from '../components/homepage/DropDownFilter';
import Listings from '../components/homepage/Listings';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0);
  const listingsRef = useRef(null); // Ref for the listings div

  const handleScroll = () => {
    if (listingsRef.current) {
      const scrollTop = listingsRef.current.scrollTop;

      if (scrollTop > lastScrollTop.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop; // For negative scrolling
    }
  };

  useEffect(() => {
    const listingsDiv = listingsRef.current;

    if (listingsDiv) {
      listingsDiv.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listingsDiv) {
        listingsDiv.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className='flex flex-col h-full w-full'>
      {/* Filters */}
      <div className={`flex flex-col w-full  ${isVisible ? 'h-auto' : 'h-0 overflow-hidden'} transition-all duration-300`}>
        <DropDownFilter />
        <TypeFilters />
        <ConfigFilters />
      </div>
      {/* Listings */}
      <div className='flex-grow overflow-auto' ref={listingsRef}>
       <Listings />
      </div>
    </div>
  );
}

export default HomePage;
