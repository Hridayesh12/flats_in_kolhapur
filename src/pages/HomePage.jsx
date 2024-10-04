import React, { useEffect, useRef, useState } from 'react';
import TypeFilters from '../components/homepage/TypeFilters';
import ConfigFilters from '../components/homepage/ConfigFilters';
import DropDownFilter from '../components/homepage/DropDownFilter';
import Listings from '../components/homepage/Listings';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0);
  const listingsRef = useRef(null); // Ref for the listings div
  const isSmallScreen = window.innerWidth <= 715; // Example small screen threshold

  // Logic for large screens (scroll and wheel based)
  const handleScroll = () => {
    if (listingsRef.current) {
      const scrollTop = listingsRef.current.scrollTop;
      const scrollHeight = listingsRef.current.scrollHeight;
      const clientHeight = listingsRef.current.clientHeight;

      // Check if there's enough scrollable height
      const isScrollable = scrollHeight > clientHeight;

      if (isScrollable) {
        if (scrollTop > lastScrollTop.current) {
          // Scrolling down
          setIsVisible(false);
        } else if (scrollTop < lastScrollTop.current) {
          // Scrolling up
          setIsVisible(true);
        }
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop; // For negative scrolling
    }
  };

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
  };

  // Logic for small screens (touch-based)
  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const currentY = touch.clientY;

    if (currentY > lastScrollTop.current) {
      // Scrolling down
      setIsVisible(true);
    } else {
      // Scrolling up
      setIsVisible(false);
    }

    lastScrollTop.current = currentY; // Update the last scroll position
  };

  useEffect(() => {
    const listingsDiv = listingsRef.current;

    // Check if it's a small or large screen and apply relevant event listeners
    if (listingsDiv) {
      if (isSmallScreen) {
        // Small screens - Use touch events
        listingsDiv.addEventListener('touchmove', handleTouchMove);
      } else {
        // Large screens - Use scroll and wheel events
        listingsDiv.addEventListener('scroll', handleScroll);
        listingsDiv.addEventListener('wheel', handleWheel);
      }
    }

    return () => {
      if (listingsDiv) {
        if (isSmallScreen) {
          // Remove touch events for small screens
          listingsDiv.removeEventListener('touchmove', handleTouchMove);
        } else {
          // Remove scroll and wheel events for large screens
          listingsDiv.removeEventListener('scroll', handleScroll);
          listingsDiv.removeEventListener('wheel', handleWheel);
        }
      }
    };
  }, [isSmallScreen]); // Re-run effect if screen size changes

  return (
    <div className='flex flex-col h-full w-full'>
      {/* Filters */}
      <div className={`flex flex-col w-full ${isVisible ? 'h-auto' : 'h-0 overflow-hidden'} transition-all duration-300`}>
        <DropDownFilter />
        <TypeFilters />
        <ConfigFilters />
      </div>
      {/* Listings */}
      <div className='flex-grow overflow-y-auto overflow-x-hidden' ref={listingsRef}>
        <Listings />
      </div>
    </div>
  );
};

export default HomePage;
