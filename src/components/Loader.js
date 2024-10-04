import React from 'react';

const Loader = () => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-base-600'>
            <img src="http://192.168.22.25:3000/assets/loader.gif" alt="Loading..." />
        </div>
    );
};

export default Loader;
