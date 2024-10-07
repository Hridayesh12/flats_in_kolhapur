import React from 'react';

const Loader = () => {
    return (
        <div className='abolute z-50 flex items-center justify-center min-h-screen max-h-screen bg-base-600'>
            <img src="https://flats-in-kolhapur.vercel.app/assets/loader.gif" className='w-52' alt="Loading..." />
        </div>
    );
};

export default Loader;
