import React from 'react';
import { useNavigate } from 'react-router-dom';

const FavCard = ({ price, bhk, name, location,description, img, priceUnit }) => {
 
  const navigate = useNavigate();
  const style = {
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover', // Ensures the background image covers the element
    backgroundPosition: 'center', // Centers the image within the element
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    height: '100%', // Adjust height as needed
    width: '100%' // Adjust width as needed
  };
  return (
       <div className="bg-base-100 shadow-xl flex border-[1px] border-base-300" >
      <div className="w-[20%] h-[100%] ">
         <img src={`http://flatsinkolhapur.com:5000/v1${img}`} alt="Card" className="object-cover w-full h-full" />
      </div>

      <div className='flex flex-col items-start justify-between p-2 w-[42%]'>
        <div className='flex flex-col items-start'>
        <p className='text-base leading-none font-medium'>₹ {price} {priceUnit}</p>
        <span className='text-[10px] -leading-[1px]'>onwards</span>
        </div>
        <div className='flex flex-col items-start'>
        <p className='text-base leading-none font-medium'>{bhk} BHK<br/></p>
        <span className='text-[10px] -leading-[1px]'>posted by owner</span>
        </div>
        
      </div>

      <div className='flex flex-col items-start justify-around p-2 w-[42%] bg-base-600 text-base-100'>
        <p className='text-base font-bold'>{location}</p>
        <p className='text-sm font-normal'>{name}</p>
        <p
						className='text-[10px]  flex flex-wrap overflow-hidden text-ellipsis group relative'
						style={{
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}>
						{description}
					</p>
      </div>

  </div>

  );
};

export default FavCard;