import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/features/filterSlice";
import { motion } from "framer-motion";

const configurations = [
	{
		value: "flat",
		configs: ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK", "6BHK"],
	},
	{ value: "bungalow", configs: ["2BHK", "3BHK", "4BHK", "5BHK"] },
	{ value: "rowhouse", configs: ["2BHK", "3BHK", "4BHK"] },
	{
		value: "plot",
		configs: ["1000 sqft", "1500 sqft", "2000 sqft", "3000 sqft"],
	},
	{ value: "shop", configs: ["Small", "Medium", "Large"] },
	{
		value: "office",
		configs: ["Private Cabin", "Shared Space", "Conference Room"],
	},
];

const ConfigFilters = () => {
	const dispatch = useDispatch();

	// Get activeType and activeConfig from Redux
	const activeType = useSelector((state) => state.filters.type);
	const activeConfig = useSelector((state) => state.filters.config);

	// Find the configuration array based on activeType
	const selectedConfigurations = configurations.find(
		(config) => config.value === activeType
	)?.configs;

	const handleConfigChange = (selectedConfig) => {
		dispatch(
			setFilters({
				config: selectedConfig.toLowerCase(),
			})
		);
	};

	// Parent container with stagger animation
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2, // Stagger children with a 0.2s delay
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
		},
	};

	return (
		<motion.div
			className='flex flex-row flex-nowrap items-center justify-center pt-4 pb-3 w-full max-w-96 mx-auto gap-1.5'
			variants={containerVariants}
			initial='hidden'
			animate='visible'>
			{/* Display only the configs of the active type */}
			{selectedConfigurations?.map((config, index) => (
				<motion.div
					key={`${activeType}-${config}`} // Ensure unique key for each type-config pair
					// className={`px-2 py-0.5 text-[11px] border-[1px] border-base-400 cursor-pointer transition-all duration-300 ${
					// 	activeConfig && activeConfig.toUpperCase() === config
					// 		? "bg-base-400 text-white"
					// 		: ""
					// }`}
					variants={itemVariants}
					transition={{
						delay: index * 0.2, // Incremental delay based on index
					}} // Assigning delay based on index
				>
					{activeConfig && activeConfig.toUpperCase() === config ? (
						<span className='px-2 py-0.5 text-[13px] border-[1px] border-base-400 cursor-pointer transition-all duration-300 bg-base-400 text-white'
						onClick={() => handleConfigChange('deselect')}
						>
							{config}
						</span>
					) : (
						<span className='px-2 py-0.5 text-[13px] border-[1px] border-base-400 cursor-pointer transition-all duration-300 '
						onClick={() => handleConfigChange(config)}
						>
							{config}
						</span>
					)}
				</motion.div>
			))}
		</motion.div>
	);
};

export default ConfigFilters;
