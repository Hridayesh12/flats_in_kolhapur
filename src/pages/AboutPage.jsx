import React from 'react'
import { assetsUrl } from '../config/url';

const AboutPage = () => {
  return (
		<div
			className='bg-cover bg-center border-2 border-instagram w-full h-[90vh] flex flex-col justify-between'
			style={{
				backgroundImage:
					"url('/assets/images/aboutpage/bg.jpg')",
			}}>
			<div
				className='text-base-100 opacity-90  py-6 px-8 flex-1'
				style={{
					background:
						"linear-gradient(to top right, rgba(46, 46, 46, 0.651), rgb(0, 0, 0))",
				}}>
				<p className='italic ... text-base/[22px]  mb-2 font-bold mt-10'>
					About Us
				</p>
				<p className='text-xs/[14px]  leading-4 mb-3'>
					Welcome to Flats in Kolhapur, your trusted partner in finding the
					perfect home in the vibrant city of Kolhapur. Our mission is to
					connect homebuyers and investors with the finest residential
					properties in the region, offering a seamless and transparent
					experience throughout your real estate journey.
				</p>
				<p className='text-xs/[14px]  leading-4 mb-3  '>
					At Flats in Kolhapur, we are a dedicated team of real estate
					professionals with deep-rooted knowledge of the Kolhapur property
					market. We understand the unique charm and potential of this city,
					known for its rich history, cultural heritage, and thriving economy.
					Our expertise lies in curating a diverse portfolio of flats, ranging
					from affordable housing to luxurious apartments, catering to a wide
					range of preferences and budgets..
				</p>
				<p className='italic ... text-base/[22px] font-bold mb-2'>
					Why Choose Us?
				</p>
				<p className='text-xs/[14px]  leading-4 mb-16'>
					Choosing Flats in Kolhapur means opting for a hassle-free and
					enjoyable home-buying experience. Whether you're a first-time buyer, a
					seasoned investor, or someone looking to relocate to Kolhapur, we are
					here to make your dream of owning a home a reality.
				</p>
			</div>

			<div className='w-full p-4 bg-[rgba(0,0,0,0.7)] px-7 py-7'>
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
	);
}

export default AboutPage