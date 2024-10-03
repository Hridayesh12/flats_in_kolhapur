import React from 'react';

const FavCard = ({ price, bhk, builder, name, location,description, img, priceUnit }) => {
  const style = {
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover', // Ensures the background image covers the element
    backgroundPosition: 'center', // Centers the image within the element
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    height: '100%', // Adjust height as needed
    width: '100%' // Adjust width as needed
  };
  return (
    <div className="w-full flex shadow-xl h-20 mb-4">
      <div className="w-[20%] h-[100%] ">
         <img src={`http://192.168.1.131:5000/v1${img}`} alt="Card" className="object-cover w-full h-full" />
      </div>

      <div className='flex flex-col items-start justify-around p-1 w-[36%]'>
        <p className='text-sm font-medium'>₹ {price} {priceUnit}</p>
        <p className='text-sm font-medium'>{bhk} bhk</p>
      </div>

      <div className='flex flex-col items-start justify-around p-2 w-[44%] bg-base-600 text-base-100'>
        <p className='text-sm   font-bold'>{location}</p>
        <p className='text-sm font-normal'>{name}</p>
        <p className="text-[8px] font-normal leading-[9px]">{description}</p>
      </div>

  </div>

  );
};

export default FavCard;