import React from 'react'
import { baseUrl } from '../../config/url'

const DropDownFilter = () => {
  return (
     <div className='text-base-1000 w-full px-8 py-4 relative flex items-center justify-center' style={{ boxShadow: '2px 2px 4px 1px rgba(0, 0, 0, 0.25)' }}>
                <div className='w-72 shadow-custom-shadow rounded-md py-[6px] px-5 flex items-center justify-between text-xs  border-[1px] border-base-700 '>
                 <button
                        className={`' flex flex-col items-start gap-0'}`}
                        // 'bg-base-600 text-base-100 backdrop:shadow-button-shadow rounded-md p-1'
                        // onClick={() => { setLocation(null);setLocationFilterList(true);
                        //     if(openPossesionStatusFilterList){
                        //         setPossesionStatusFilterList(false); 
                        //     }
                        //     if(openPriceFilterList){
                        //         setPriceFilterList(false);
                        //     }
                        //  }}
                    >
                        <p className='leading-none text-[11px] font-normal '>Location</p>
                        <p style={{ fontSize: "0.5rem" }} className='leading-none text-[11px] font-normal '>Rajarampuri</p>
                    </button>
                      <div className='h-full border-[0.5px] border-base-700 min-h-4'></div>

                    {/* Price Button */}
                    <button
                        className={`flex flex-col items-start gap-0`}
                        // ${openPriceFilterList ? 'bg-base-600 text-base-100 shadow-button-shadow rounded-md p-1' : 
                        // onClick={() => { setPrice(null); setPriceFilterList(true);
                        //     if(openPossesionStatusFilterList){
                        //         setPossesionStatusFilterList(false); 
                        //     }
                        //     if(openLocationFilterList){
                        //         console.log("Location setter running")
                        //         setLocationFilterList(false)
                        //     }
                        // }}
                    >
                        <p className='leading-none text-[11px] font-normal '>Price</p>
                        <p style={{ fontSize: "0.5rem" }} className='leading-none text-[11px] font-normal '>
                            {/* {price && `₹${price?.toLocaleString("en-IN")}`} */}
                            10000000
                        </p>
                    </button>
                    <div className='h-full border-[0.5px] border-base-700 min-h-4'></div>
                     <button
                        className={' flex flex-col items-start gap-0 pr-3'}
                        // `${openPossesionStatusFilterList ? 'bg-base-600 text-base-100 shadow-button-shadow rounded-md p-1' : 
                        // onClick={() => { setPossessionStatus(null); setPossesionStatusFilterList(true);
                        //     if(openLocationFilterList){
                        //         setLocationFilterList(false)
                        //     }
                        //     if(openPriceFilterList){
                        //         setPriceFilterList(false)
                        //     }
                        // }}
                    >
                        <p className='leading-none text-[11px] font-normal '>Project Status</p>
                        <p style={{ fontSize: "0.5rem" }} className='leading-none text-[11px] font-normal '>Planning</p>
                    </button>
                      <button
                        className='w-5'
                        // onClick={() => {
                        //     if (location || possessionStatus || price) {
                        //         setLocation(null);
                        //         setPrice(null);
                        //         setPossessionStatus(null);
                        //         setValue(minValue);
                        //     }
                        //     setLocationFilterList(!openLocationFilterList);
                        // }}
                    > 
                    <img src={`${baseUrl}/assets/svgs/filter_icons/filter.svg`} alt="Filters" />
                    </button>
                </div>
    </div>
  )
}

export default DropDownFilter