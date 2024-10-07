import React, { useState, useEffect, useRef } from "react";
import { assetsUrl } from "../../config/url";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/features/filterSlice";
const areaKeywords = [
  'shivaji park', 'laxmipuri', 'dabholkar corner', 'rajarampuri', 'kasba bawada', 
  'rukmini nagar', 'ichalkaranji', 'bawada', 'gandhinagar', 'station road', 'market yard', 
  'shahupuri', 'pratibha nagar', 'kalamba', 'nagala park', 'tarabai Park'
];

const typeKeywords = [
  'flats', 'flat', 'bungalow', 'bungalows', 'row house', 'row houses', 'shop', 'shops', 'office', 'offices'
];

const configKeywords = [
  '1bhk', '1 bhk', '2bhk', '2 bhk', '3bhk', '3 bhk', '4bhk', '4 bhk', '5bhk', '5 bhk'
];

const typeMapping = {
  'flats': 'flat',
  'flat': 'flat',
  'bungalow': 'bungalow',
  'bungalows': 'bungalow',
  'row house': 'rowhouse',
  'row houses': 'rowhouse',
  'shop': 'shop',
  'shops': 'shop',
  'office': 'office',
  'offices': 'office',
  '1bhk': '1BHK',
  '1 bhk': '1BHK',
  '2bhk': '2BHK',
  '2 bhk': '2BHK',
  '3bhk': '3BHK',
  '3 bhk': '3BHK',
  '4bhk': '4BHK',
  '4 bhk': '4BHK',
  '5bhk': '5BHK',
  '5 bhk': '5BHK'
};

const NavBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state)=>state.filters);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  // Close menu and search when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (!searchOpen) {
      setSearchText(""); // Clear search text when opening
    }
  };

  const handleSearchInput = (input) => {
    const lowerInput = input.toLowerCase();
    const updatedFilters = { ...filters };

    // Area keyword matching - Ensure "Tarabai Park" and other areas work
    const foundArea = areaKeywords.find(area => lowerInput.includes(area.toLowerCase()));
    if (foundArea) {
      updatedFilters.area = foundArea.charAt(0).toUpperCase() + foundArea.slice(1);
    }

    // Property type keyword matching
    const foundType = typeKeywords.find(type => lowerInput.includes(type));
    if (foundType && typeMapping[foundType]) {
      updatedFilters.type = typeMapping[foundType];
    }

    // Property configuration keyword matching
    const foundConfig = configKeywords.find(config => lowerInput.includes(config));
    if (foundConfig) {
      updatedFilters.config = typeMapping[foundConfig];
    }

    // Check for price information
   // Match for min price, below, minimum, and the start of the string
const minPriceMatch = input.match(/(?:min\s|minimum\s|above\s|^)([0-9]+)/i);

// Match for max price, above, maximum, and the end of the string
const maxPriceMatch = input.match(/(?:max\s|maximum\s|below\s|$)([0-9]+)/i);

    
    if (minPriceMatch) {
      updatedFilters.minPrice = parseInt(minPriceMatch[1], 10);
    } else {
      updatedFilters.minPrice = null;
    }

    if (maxPriceMatch) {
      updatedFilters.maxPrice = parseInt(maxPriceMatch[1], 10);
    } else {
      updatedFilters.maxPrice = 50000000;
    }

    // Apply the updated filters
    dispatch(setFilters(updatedFilters));
  };
  
  const handleSearch = () => {
    // Reset filters before every search
    dispatch(
        setFilters({
            type: 'flat',
            config: null,
            area: null,
            possessionStatus: null,
            minPrice: null,
            maxPrice: 50000000,
            nearByPlaces: null,
          })
    )
    handleSearchInput(searchText);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="bg-base-600 text-base-100 flex flex-row justify-between w-full px-4 py-3 sm:px-12 sm:py-5 relative">
      <Link to="/">
        <img
          src={`${assetsUrl}/assets/svgs/flats_in_kop_mobile_icon.svg`}
          className="w-full h-full block sm:hidden"
          alt="Flats In Kolhapur Logo"
        />
        <img
          src={`${assetsUrl}/assets/svgs/flats_in_kop_desktop_icon.svg`}
          className="w-full h-full hidden sm:block"
          alt="Flats In Kolhapur Logo"
        />
      </Link>
      {/* Search Bar */}
      {searchOpen && (
        <input
          ref={searchRef}
          type="text"
          className="bg-base-600 text-base-100 ml-10 my-1 rounded-l-md px-2 border-l-2 border-t-2 border-b-2 border-r-0 border-base-100 flex-1 focus:outline-none hidden sm:block"
          placeholder="Press enter to search..."
          value={searchText}
          autoFocus
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      <div className="flex items-center gap-4">
     {searchOpen ?
       <img
       onClick={()=>{handleSearch()}}
       src={`${assetsUrl}/assets/svgs/navbar_icons/search.svg`}
       className={`${searchOpen ? "w-9 h-14 cursor-pointer hidden sm:block rounded-r-md border-r-2 border-t-2 border-b-2":"w-9 h-full cursor-pointer hidden sm:block"}`}
       alt="Search"
     /> :
     <img
     onClick={toggleSearch}
     src={`${assetsUrl}/assets/svgs/navbar_icons/search.svg`}
     className={`${searchOpen ? "w-9 h-14 cursor-pointer hidden sm:block rounded-r-md border-r-2 border-t-2 border-b-2":"w-9 h-full cursor-pointer hidden sm:block"}`}
     alt="Search"
   /> 
    }
        <Link to="/favorite">
          <img
            src={`${assetsUrl}/assets/svgs/navbar_icons/favorite.svg`}
            className="w-7 h-full hidden sm:block"
            alt="Favorite"
          />
        </Link>
        <Link to="/my-account">
          <img
            src={`${assetsUrl}/assets/svgs/navbar_icons/account.svg`}
            className="w-7 h-full hidden sm:block"
            alt="Account"
          />
        </Link>

        <img
          onClick={toggleMenu}
          src={`${assetsUrl}/assets/svgs/navbar_icons/hamburger.svg`}
          className="w-10 sm:w-11 h-full cursor-pointer"
          alt="Hamburger"
        />
      </div>
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute z-50 flex flex-col w-24 bg-base-300 text-base-600 opacity-95 top-full right-10 sm:right-16 shadow-nav-hamburger-menu-shadow"
        >
          <Link
            to="/about"
            className={
              location.pathname.split("/")[1] === "about"
                ? "w-full flex items-center justify-center py-1 shadow-nav-hamburger-menu-link-shadow"
                : "w-full flex items-center justify-center py-1 hover:shadow-nav-hamburger-menu-link-shadow"
            }
            onClick={handleLinkClick}
          >
            About Us
          </Link>
          <Link
            to="/favorite"
            className={
              location.pathname.split("/")[1] === "favorite"
                ? "w-full flex items-center justify-center py-1 shadow-nav-hamburger-menu-link-shadow"
                : "w-full flex items-center justify-center py-1 hover:shadow-nav-hamburger-menu-link-shadow"
            }
            onClick={handleLinkClick}
          >
            Favorites
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
