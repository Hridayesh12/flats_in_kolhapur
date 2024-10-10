import React from 'react';
import { useNavigate } from 'react-router-dom';

const FavCard = ({ price, bhk, name, location,description, img}) => {
 
  const navigate = useNavigate();
  return (
       <div className="animate-pulsebg-base-100 shadow-xl flex border-[1px] border-base-300" onClick={()=>{navigate('/')}}>
      <div className="w-[20%] h-[100%] ">
         <img src={`${img}`} alt="Card" className="object-cover w-full h-full" />
      </div>

      <div className='flex flex-col items-start justify-between p-2 w-[42%]'>
        <div className='flex flex-col items-start'>
        <p className='text-base leading-none font-medium'>₹ {price}</p>
        <span className='text-[10px] -leading-[1px]'>onwards</span>
        </div>
        <div className='flex flex-col items-start'>
        <p className='text-base leading-none font-medium'>{bhk}<br/></p>
        <span className='text-[10px] -leading-[1px]'>posted by owner</span>
        </div>
        
      </div>

      <div className='flex flex-col items-start justify-around p-2 w-[42%] bg-base-600 text-base-100'>
        <p className='text-base font-bold'>{name}</p>
        <p className='text-sm font-normal'>{location}</p>
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