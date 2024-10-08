import React, { useState, useRef, useEffect } from "react";
import { assetsUrl } from "../../config/url";
import PriceFilter from "./filters/PriceFilter";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/features/filterSlice";
import { motion } from "framer-motion";
import { fetchAllLocations } from "../../services/filterService";

const projectStatus = [
	"Planning","Under Construction", "Nearing Possession", "Ready For Possession"
];
const DropDownFilter = () => {
	const [locations, setLocations] = useState([]);
	const dispatch = useDispatch();
	const locate = useSelector((state) => state.filters.area);
	const prStatus = useSelector((state) => state.filters.possessionStatus);
	const minimumPrice = useSelector((state) => state.filters.minPrice);

	const [showLocationFilter, setShowLocationFilter] = useState(false);
	const [showPriceFilter, setShowPriceFilter] = useState(false);
	const [showPossessionFilter, setShowPossessionFilter] = useState(false);
	const locationRef = useRef();
	const priceRef = useRef();
	const possessionRef = useRef();

	const containerVariants = {
		hidden: { scale: 0 },
		visible: { scale: 1 },
		exit: { scale: 0 },
	};
	const handleLocationChange = (selectedArea) => {
		dispatch(
			setFilters({
				area: selectedArea,
			})
		);
	};
	const handleStatusChange = (selectedStatus) => {
		dispatch(
			setFilters({
				possessionStatus: selectedStatus,
			})
		);
	};
	const fetchLocations = async() => {
		const response = await fetchAllLocations();
		setLocations(response.data);
	}
	useEffect(()=>{
		fetchLocations();
	},[])
	// Close dropdown when clicked outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (locationRef.current && !locationRef.current.contains(event.target)) {
				setShowLocationFilter(false);
			}
			if (priceRef.current && !priceRef.current.contains(event.target)) {
				setShowPriceFilter(false);
			}
			if (
				possessionRef.current &&
				!possessionRef.current.contains(event.target)
			) {
				setShowPossessionFilter(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className='text-base-1000 w-full px-8 py-4 relative flex items-center justify-center'
			style={{ boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.25)" }}>
			<div className='w-72 shadow-custom-shadow rounded-md py-[6px] px-5 flex items-center justify-between text-xs border-[1px] border-base-700'>
				{/* Location Button */}
				<button
					onClick={() => setShowLocationFilter(!showLocationFilter)}
					className={`flex flex-col items-start gap-0 ${
						showLocationFilter && "bg-base-600 text-base-100 rounded-md p-1"
					}`}>
					<p className='leading-none text-[11px] font-normal'>Location</p>
					{locate && !showLocationFilter && (
						<p
							style={{ fontSize: "0.5rem" }}
							className='leading-none text-[11px] font-normal'>{locate}</p>
					)}
				</button>
				<div className='h-full border-[0.5px] border-base-700 min-h-4'></div>

				{/* Price Button */}
				<button
					onClick={() => setShowPriceFilter(!showPriceFilter)}
					className={`flex flex-col items-start gap-0 ${
						showPriceFilter && "bg-base-600 text-base-100 rounded-md p-1"
					}`}>
					<p className='leading-none text-[11px] font-normal'>Price</p>
					{minimumPrice!==100000 && !showPriceFilter && (
						<p
							style={{ fontSize: "0.5rem" }}
							className='leading-none text-[11px] font-normal'>
							{minimumPrice}
						</p>
					)}
				</button>
				<div className='h-full border-[0.5px] border-base-700 min-h-4'></div>

				{/* Possession Status Button */}
				<button
					onClick={() => setShowPossessionFilter(!showPossessionFilter)}
					className={`flex flex-col items-start gap-0 mr-3 ${
						showPossessionFilter && "bg-base-600 text-base-100 rounded-md p-1"
					}`}>
					<p className='leading-none text-[11px] font-normal'>Project Status</p>
					{prStatus && !showPossessionFilter && (
						<p
							style={{ fontSize: "0.5rem" }}
							className='leading-none text-[11px] font-normal'>
							{prStatus}
						</p>
					)}
				</button>

				<button className='w-5'>
					<img
						src={`${assetsUrl}/assets/svgs/filter_icons/filter.svg`}
						alt='Filters'
					/>
				</button>
			</div>

			<motion.div
		variants={containerVariants}
		initial="hidden"  // Initial state of the animation
		animate={
			(showLocationFilter || showPriceFilter || showPossessionFilter) ? "visible" : "hidden"
		} // Animate to 'visible' when any filter is shown
		exit="exit" // Animate to 'exit' when no filters are shown
			className={`w-72 z-50 absolute shadow-custom-shadow rounded-md flex flex-col items-start text-xs text-base-400 bg-base-100 top-[53px] border-[1px] border-base-700`}
		>
			{/* Location Filter Dropdown */}
			{showLocationFilter && (
				<motion.div
					ref={locationRef}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }} // Exit animation
					transition={{ duration: 0.2 }} // Control the duration of animation
					className="w-full h-full flex flex-col items-center top-14 rounded-md px-3 py-1 bg-white z-10"
				>
					<div className="flex flex-row w-full h-24 rounded-md pl-1 py-1">
						{/* First List (Vertical List) */}
						<ul className="grid grid-cols-2 gap-1 items-start w-full h-full overflow-y-auto">
							{locations.map((area, index) => (
								<li
									key={index}
									className={`${
										locate === area
											? "bg-base-600 text-base-100 w-fit rounded-md"
											: "text-base-600"
									} p-1 cursor-pointer`}
									onClick={() => {
										handleLocationChange(area);
										setShowLocationFilter(false);
									}}
								>
									{area}
								</li>
							))}
						</ul>
					</div>
				</motion.div>
			)}

			{/* Price Filter Dropdown */}
			{showPriceFilter && (
				<motion.div
					ref={priceRef}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }} // Exit animation
					transition={{ duration: 0.2 }} // Control the duration of animation
					className="relative w-full h-full flex flex-col items-center  rounded-md px-3 pt-2 pb-1 bg-white z-10"
				>
					<PriceFilter setPriceFilter={setShowPriceFilter} />
				</motion.div>
			)}

			{/* Possession Status Filter Dropdown */}
			{showPossessionFilter && (
				<motion.div
					ref={possessionRef}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }} // Exit animation
					transition={{ duration: 0.2 }} // Control the duration of animation
					className="w-full h-full flex flex-col items-center rounded-md px-3 py-1 bg-white z-10"
				>
					<div className="flex flex-row w-full h-24 rounded-md pl-1 py-1">
						{/* First List (Vertical List) */}
						<ul className="grid grid-cols-2 gap-1 items-start w-full h-full overflow-y-auto">
							{projectStatus.map((status, index) => (
								<li
									key={index}
									className={`${
										prStatus === status
											? "bg-base-600 text-base-100 w-fit rounded-md"
											: "text-base-600"
									} p-1 cursor-pointer`}
									onClick={() => {
										handleStatusChange(status);
										setShowPossessionFilter(false);
									}}
								>
									{status}
								</li>
							))}
						</ul>
					</div>
				</motion.div>
			)}
		</motion.div>
		</div>
	);
};

export default DropDownFilter;
