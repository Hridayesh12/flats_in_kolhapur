import React from 'react'
import { assetsUrl } from '../config/url'

const ContactUs = () => {
  return (
    <div className='w-full p-4 bg-base-600 px-7 py-7'>
    <div className='w-full h-full hidden sm:block'></div>
    <div className='w-full h-full block sm:hidden'>
    <p className='text-[15px] text-base-300 font-bold mb-1'>Contact Us</p>
    <p className='text-[15px] text-base-300 mb-2'>+91 99992 25254</p>
    <div className='flex justify-between items-start '>
        <div className='flex-1 pr-4'>
            <p className='text-base-300 text-[11px] font-normal leading-[14.4px] text-left mb-1'>
                9:30 AM to 6:30 PM (Mon-Sun)
            </p>
            <p className='text-base-300 text-[13px] font-normal leading-[18px] text-left pt-1'>
                flatsinkolhapur@gmail.com
            </p>
        </div>
        <div className='flex-1'>
            <p className='text-[15px] font-normal leading-[20.4px] text-left text-base-300 mb-1'>
                Connect With Us
            </p>
            <div className='flex gap-2 items-center'>
                <a href='#'>
                    <img
                        className='h-5'
                        src={`${assetsUrl}/assets/svgs/about_icons/facebook.svg`}
                        alt='Facebook'
                    />
                </a>
                <a href='#'>
                    <img
                        className='h-5'
                        src={`${assetsUrl}/assets/svgs/about_icons/instagram.svg`}
                        alt='Instagram'
                    />
                </a>
                <a href='#'>
                    <img
                        className='h-5'
                        src={`${assetsUrl}/assets/svgs/about_icons/twitter.svg`}
                        alt='Twitter'
                    />
                </a>
  <a href='#'>
                    <img
                        className='h-5'
                        src={`${assetsUrl}/assets/svgs/about_icons/youtube.svg`}
                        alt='YouTube'
                    />
                </a>
                <a href='#'>
                    <img
                        className='h-5'
                        src={`${assetsUrl}/assets/svgs/about_icons/linkedin.svg`}
                        alt='LinkedIn'
                    />
                </a>
                
            </div>
        </div>
    </div>
    </div>
</div>
  )
}

export default ContactUs
