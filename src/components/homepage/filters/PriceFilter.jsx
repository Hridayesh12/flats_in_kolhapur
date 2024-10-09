import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../../store/features/filterSlice";

const PriceFilter = ({setPriceFilter}) => {
	const dispatch = useDispatch();
	const minValue = useSelector((state) => state.filters.minPrice);
	const maxValue = useSelector((state) => state.filters.maxPrice);

	const [value, setValue] = useState(minValue);
	const barHeights = [
		5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
		100,
	];

	const handleSliderChange = (e) => {
		setValue(Number(e.target.value));	
	};

	const handlePriceChange=()=>{
		dispatch(
			setFilters({
				minPrice: value,
				maxPrice: maxValue,
			})
		);
		setPriceFilter(false);
	}
	return (
		<>
			<button
			onClick={()=>{handlePriceChange()}}
				className={`absolute right-2 top-2 p-1 shadow-button-shadow rounded-md leading-none bg-base-600 text-base-100`}>
				OK
			</button>
			{/* Price Slider */}
			<div className='relative z-0 w-[70%] h-20 my-1 flex items-end justify-between'>
				{barHeights.map((height, index) => (
					<div
						key={index}
						className='h-full w-1 mr-[0.5] bg-base-400'
						style={{
							height: `${height}%`,
							background:
								index <= (value / maxValue) * barHeights.length - 1
									? "#000000"
									: "#b7b7b7",
						}}></div>
				))}
			</div>
			<input
				type='range'
				min='100000'
				max={maxValue}
				value={value}
				step='100000'
				onChange={handleSliderChange}
				className='appearance-none h-[0.2rem] w-[72%] rounded-lg bg-transparent outline-none relative z-20'
				style={{
					background: `linear-gradient(to right, #000000 ${
						(value / maxValue) * 100
					}%, #b7b7b7 ${(value / maxValue) * 100}%)`,
				}}
			/>
			<div className='flex items-center justify-between px-2 w-full mt-1'>
				<div className='flex flex-col items-start'>
					<p
						className={`text-sm `}>
						Minimum
					</p>
					<div className='flex items-center gap-1'>
						<p
							className={`text-sm leading-0 text-base-600`}>
							₹{" "}<span className="text-md">{value.toLocaleString("en-IN")}</span>
						</p>
					</div>
				</div>
				<div className='flex flex-col items-end'>
					<p
						className={`text-sm `}>
						Maximum
					</p>
					<div className='flex items-center gap-1'>
						<p
							className={`text-sm leading-0 text-base-600`}>
							₹{" "}<span className="text-md">{maxValue.toLocaleString("en-IN")}</span>
						</p>
					
					</div>
				</div>
			</div>
		</>
	);
};

export default PriceFilter;
