import React, { useState, useEffect, useRef } from 'react';
import { assetsUrl } from '../../config/url';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../store/features/filterSlice';

const areaKeywords = [
    'shivaji park', 'laxmipuri', 'dabholkar corner', 'rajarampuri', 'kasba bawada', 
    'rukmini nagar', 'ichalkaranji', 'bawada', 'gandhinagar', 'station road', 'market yard', 
    'shahupuri', 'pratibha nagar', 'kalamba', 'nagala park', 'tarabai Park', 'unchagaon', 'phulewadi','sambhaji nagar', 'managawar peth'
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


const Footer = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state)=>state.filters);
    const location = useLocation();
    const navigate = useNavigate();
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef(null);

    // Function to handle search icon click
    const handleSearchClick = () => {
      navigate('/');
        setSearchVisible(true);
    };

    // Function to handle outside click
    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setSearchVisible(false);
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

    // Attach the event listener for outside clicks
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`flex flex-row items-center justify-between w-full bg-base-100 shadow-footer-shadow py-3 marker ${isSearchVisible ? "px-6" : "px-16"}`}>
            <div onClick={handleSearchClick} className={`${isSearchVisible ? 'hidden' : 'flex'}`}>
                <img
                    src={`${assetsUrl}/assets/svgs/footer_icons/search.svg`}
                    className="w-full h-7"
                    alt="Search"
                />
            </div>
            {isSearchVisible && (
                <div ref={inputRef} className="relative flex items-center w-full">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e)=>{setSearchText(e.target.value)}}
                        className="flex-1 rounded-l-md border-l-2 border-t-2 border-b-2 border-r-0 border-base-400 px-4 py-2 focus:outline-none"
                        placeholder="Flats In Kolhapur..."
                        autoFocus
                    />
                    <button
                        onClick={() => {
                            handleSearch();
                            setSearchVisible(false);
                        }}
                        className="text-base-600 flex items-center justify-center gap-1 rounded-r-md border-r-2 border-t-2 border-b-2 border-base-400 px-4 py-2"
                    >
                        <img src={`${assetsUrl}/assets/svgs/footer_icons/search.svg`} className="h-6" alt="search input"/>
                    </button>
                </div>
            )}
            <div>
                <Link to="/favorite" className={`${isSearchVisible ? 'hidden' : 'flex'}`}>
                    {location.pathname.split("/").pop() === 'favorite' ? (
                        <img
                            src={`${assetsUrl}/assets/svgs/footer_icons/fav.svg`}
                            className="w-full h-7"
                            alt="Favorite"
                        />
                    ) : (
                        <img
                            src={`${assetsUrl}/assets/svgs/footer_icons/favF.svg`}
                            className="w-full h-7"
                            alt="Favorite"
                        />
                    )}
                </Link>
            </div>
            <div>
                <Link to="/my-account" className={`${isSearchVisible ? 'hidden' : 'flex'}`}>
                    {location.pathname.split("/").pop() === 'my-account' ? (
                        <img
                            src={`${assetsUrl}/assets/svgs/footer_icons/accountF.svg`}
                            className="w-full h-7"
                            alt="Account"
                        />
                    ) : (
                        <img
                            src={`${assetsUrl}/assets/svgs/footer_icons/account.svg`}
                            className="w-full h-7"
                            alt="Account"
                        />
                    )}
                </Link>
            </div>
        </div>
    );
};

export default Footer;
