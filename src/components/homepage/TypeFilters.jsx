import React from 'react'
import { baseUrl } from '../../config/url'

const TypeFilters = () => {
  return (
    <div className='flex flex-row flex-nowrap items-center justify-center gap-[3px] sm:gap-6 md:gap-16 pt-4 pb-4 w-full overflow-auto filter'
				style={{ boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.25)"}}>
      <div className={`flex flex-col items-center justify-between cursor-pointer min-w-14 sm:min-w-24 min-h-14 max-h-14 sm:max-h-24`}>
        <img src={`${baseUrl}/assets/svgs/type_icons/flat.svg`}  className='w-8 md:w-10 h-full object-cover' alt="Flat"/>
        <p className='text-[11px] sm:text-sm md:text-base font-normal text-nowrap'>Flats</p>
        <div className="bg-base-600 w-4 sm:w-8 h-px"></div>
      </div>
      <div className={`flex flex-col items-center justify-between cursor-pointer min-w-14 sm:min-w-24 min-h-14 max-h-14 sm:max-h-24`}>
        <img src={`${baseUrl}/assets/svgs/type_icons/bungalow.svg`}  className='w-8 md:w-10 h-full object-cover' alt="Bungalow"/>
        <p className='text-[11px] sm:text-sm md:text-base font-normal text-nowrap'>Bungalow</p>
        <div className="bg-base-600 w-4 sm:w-8 h-px"></div>
      </div>
      <div className={`flex flex-col items-center justify-between cursor-pointer min-w-14 sm:min-w-24 min-h-14 max-h-14 sm:max-h-24`}>
        <img src={`${baseUrl}/assets/svgs/type_icons/rowhouse.svg`}  className='w-8 md:w-10 h-full object-cover' alt="Row House"/>
        <p className='text-[11px] sm:text-sm md:text-base font-normal text-nowrap'>Row House</p>
        <div className="bg-base-600 w-4 sm:w-8 h-px"></div>
      </div>
      <div className={`flex flex-col items-center justify-between cursor-pointer min-w-14 sm:min-w-24 min-h-14 max-h-14 sm:max-h-24`}>
        <img src={`${baseUrl}/assets/svgs/type_icons/plot.svg`}  className='w-8 md:w-10 h-full object-cover' alt="Plot"/>
        <p className='text-[11px] sm:text-sm md:text-base font-normal text-nowrap'>Plots</p>
        <div className="bg-base-600 w-4 sm:w-8 h-px"></div>
      </div>
      <div className={`flex flex-col items-center justify-between cursor-pointer min-w-14 sm:min-w-24 min-h-14 max-h-14 sm:max-h-24`}>
        <img src={`${baseUrl}/assets/svgs/type_icons/shop.svg`}  className='w-8 md:w-10 h-full object-cover' alt="Shop"/>
        <p className='text-[11px] sm:text-sm md:text-base font-normal text-nowrap'>Shops</p>
        <div className="bg-base-600 w-4 sm:w-8 h-px"></div>
      </div>
      <div className={`flex flex-col items-center justify-between cursor-pointer min-w-14 sm:min-w-24 min-h-14 max-h-14 sm:max-h-24`}>
        <img src={`${baseUrl}/assets/svgs/type_icons/office.svg`}  className='w-8 md:w-10 h-full object-cover' alt="Office"/>
        <p className='text-[11px] sm:text-sm md:text-base font-normal text-nowrap'>Office</p>
        <div className="bg-base-600 w-4 sm:w-8 h-px"></div>
      </div>
    </div>
  )
}

export default TypeFilters
