import React from 'react';

const Loader = () => {
    return (
        <div className='abolute z-50 flex items-center justify-center min-h-screen max-h-screen bg-base-600'>
            <img src="http://192.168.1.131:3000/assets/loader.gif" alt="Loading..." />
        </div>
    );
};

export default Loader;
