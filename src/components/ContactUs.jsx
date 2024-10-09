import React from "react";
import { assetsUrl } from "../config/url";

const ContactUs = () => {
	return (
		<div className='w-full p-2 py-3 text-base-100'>
			<div className='w-full h-full hidden sm:flex px-10 justify-between items-end'>
            <div>
                <a href="/">www.flatsinkolhapur.com</a>
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
                
                <a href="/">Contact Us</a>
                <a href="tel:+91999225254">+91 99992 25254</a>
                <a href="/">9:30 AM to 6:30 PM (Mon-Sun)</a>
                <a href="mailto:flatsinkolhapur@gmail.com">flatsinkolhapur@gmail.com</a>
                <a href="/">Connect With Us</a>
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
			<div className='w-full h-full sm:hidden py-2 flex justify-between items-end'>
				<div className="flex flex-col">
				<p className='text-[15px] text-base-300 font-bold '>Contact Us</p>
				<p className='text-[15px] text-base-300'>+91 99992 25254</p>
				<div className='flex justify-between items-start '>
					<div className='flex-1 pr-4'>
						<p className='text-base-300 text-[11px] font-normal leading-[14.4px] text-left'>
							9:30 AM to 6:30 PM (Mon-Sun)
						</p>
						<p className='text-base-300 text-[13px] font-normal leading-[18px] text-left pt-1'>
							flatsinkolhapur@gmail.com
						</p>
					</div>
				</div>
					
				</div>
				<div className=''>
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
	);
};

export default ContactUs;
