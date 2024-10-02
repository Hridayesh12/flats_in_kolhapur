import React, { useState, useEffect, useRef } from 'react';
import { baseUrl } from '../../config/url';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSearchVisible, setSearchVisible] = useState(false);
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

    // Attach the event listener for outside clicks
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex flex-row items-center justify-between w-full bg-base-100 shadow-footer-shadow px-4 py-3'>
            <div onClick={handleSearchClick} className="cursor-pointer">
                <img
                    src={`${baseUrl}/assets/svgs/footer_icons/search.svg`}
                    className="w-full h-full"
                    alt="Search"
                />
            </div>
            {isSearchVisible && (
                <div ref={inputRef} className="relative flex items-center">
                    <input
                        type="text"
                        className="rounded-l-full border-l-2 border-t-2 border-b-2 border-r-0 border-base-600 px-4 py-2 focus:outline-none"
                        placeholder="Flats In Kolhapur..."
                        autoFocus
                    />
                    <button
                        onClick={() => {
                            // Handle search logic here
                            // Redirect to home page or handle search
                            setSearchVisible(false);
                        }}
                        className="text-base-600 flex items-center justify-center gap-1 rounded-r-full border-r-2 border-t-2 border-b-2 border-l-2 border-base-600 px-4 py-2"
                    >
                        Search
                        <img src={`${baseUrl}/assets/svgs/footer_icons/searchF.svg`} className="h-4" alt="search input"/>
                    </button>
                </div>
            )}
            <div>
                <Link to="/favorite">
                    {location.pathname.split("/").pop() === 'favorite' ? (
                        <img
                            src={`${baseUrl}/assets/svgs/footer_icons/favF.svg`}
                            className="w-full h-full"
                            alt="Favorite"
                        />
                    ) : (
                        <img
                            src={`${baseUrl}/assets/svgs/footer_icons/fav.svg`}
                            className="w-full h-full"
                            alt="Favorite"
                        />
                    )}
                </Link>
            </div>
            <div>
                <Link to="/my-account">
                    {location.pathname.split("/").pop() === 'my-account' ? (
                        <img
                            src={`${baseUrl}/assets/svgs/footer_icons/accountF.svg`}
                            className="w-full h-full"
                            alt="Account"
                        />
                    ) : (
                        <img
                            src={`${baseUrl}/assets/svgs/footer_icons/account.svg`}
                            className="w-full h-full"
                            alt="Account"
                        />
                    )}
                </Link>
            </div>
        </div>
    );
};

export default Footer;
