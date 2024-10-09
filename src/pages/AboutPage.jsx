import React from 'react'
import { assetsUrl } from '../config/url';
import ContactUs from '../components/ContactUs';

const AboutPage = () => {
  return (
		<div
			className='bg-clip  text bg-center w-full h-full overflow-auto flex flex-col justify-between'
			style={{
				backgroundImage:
					"url('/assets/images/aboutpage/bg.jpg')",
			}}>
			<div
				className='text-base-100 opacity-90  py-6 px-4 sm:px-56 flex-1 w-full '
				style={{
					background:
						"linear-gradient(to top right, rgba(46, 46, 46, 0.651), rgb(0, 0, 0))",
				}}>
				<p className='italic text-xl  sm:text-2xl mb-1 font-bold mt-5'>
					About Us
				</p>
				<p className='text-xs sm:text-sm'>
					Welcome to Flats in Kolhapur, your trusted partner in finding the
					perfect home in the vibrant city of Kolhapur. Our mission is to
					connect homebuyers and investors with the finest residential
					properties in the region, offering a seamless and transparent
					experience throughout your real estate journey.
				</p>
				<p className='text-xs sm:text-sm mb-1'>
					At Flats in Kolhapur, we are a dedicated team of real estate
					professionals with deep-rooted knowledge of the Kolhapur property
					market. We understand the unique charm and potential of this city,
					known for its rich history, cultural heritage, and thriving economy.
					Our expertise lies in curating a diverse portfolio of flats, ranging
					from affordable housing to luxurious apartments, catering to a wide
					range of preferences and budgets..
				</p>
				<p className='italic text-xl sm:text-2xl mb-1 font-bold'>
					Why Choose Us?
				</p>
				<p className='text-xs sm:text-sm  leading-4 mb-8'>
					Choosing Flats in Kolhapur means opting for a hassle-free and
					enjoyable home-buying experience. Whether you're a first-time buyer, a
					seasoned investor, or someone looking to relocate to Kolhapur, we are
					here to make your dream of owning a home a reality.
				</p>
			</div>
			<div className='w-full h-full bg-[rgba(0,0,0,0.7)]'>
				<ContactUs />
			</div>
		</div>
	);
}

export default AboutPage