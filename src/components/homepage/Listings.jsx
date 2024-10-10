import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setOffset } from "../../store/features/filterSlice";
import { fetchAllProjects } from "../../services/projectService";
import {
	setNextProjects,
	setProjects,
} from "../../store/features/projectSlice";
import ListingSkeleton from "../loaders/homepage/ListingSkeleton";

const Listings = () => {
	const projects = useSelector((state) => state.projects.projects);
	const [searching, setSearching] = useState(false);
	const totalProjects = useSelector((state) => state.projects.totalProjects);
	const hasMore = useSelector((state) => state.projects.hasMore);
	const dispatchEvent = useDispatch();

	const filters = useSelector((state) => state.filters);
	const limit = filters.limit;
	const offset = filters.offset;

	const initialFetch = async () => {
		setSearching(true);
		dispatchEvent(
			setFilters({
				type: "flat",
				config: null,
				area: null,
				minPrice: 100000,
				maxPrice: 50000000,
				possessionStatus: null,
				limit: 100,
				offset: 0,
			})
		);
		const params = filters;
		const response = await fetchAllProjects({ params });
		console.log(response.data);
		if (!response.data) {
			alert("Internal Server Error");
		} else {
			dispatchEvent(setProjects(response.data));
		}
		console.log("Hitting");
		setSearching(false);
	};

	const fetchMoreData = async () => {
		// Calculate new offset
		const newOffset = offset + limit;

		// Set new offset in filters
		dispatchEvent(setOffset({ newOffset }));

		// Fetch next set of data
		const params = { ...filters, offset: newOffset };
		const response = await fetchAllProjects({ params });

		// Update the project list with new data
		dispatchEvent(setNextProjects(response.data));
	};

	const filterFetch = async () => {
		setSearching(true);
		const params = filters;
		const response = await fetchAllProjects({ params });
		dispatchEvent(setProjects(response.data));
		setSearching(false);
	};
	useEffect(() => {
		dispatchEvent(
			setFilters({
				limit: 100,
				offset: 0,
			})
		);
		filterFetch();
	}, [filters]);
	useEffect(() => {
		initialFetch();
	}, []);
	return (
		<div className='w-full flex flex-col items-start justify-center relative'>
			<div className='flex items-center justify-between w-full  py-2 px-4 sm:px-12 sticky z-40 top-0 bg-base-100'>
				<p className='text-left w-80'>Total Properties: {totalProjects}</p>
			</div>
			{searching ? (
				<ListingSkeleton />
			) : (
				<>
					<div
						className={`flex w-full flex-wrap relative gap-2 px-0 sm:px-8 mx-auto`}>
						{projects?.length > 0 && projects ? (
							<>
								{projects?.map((project) => (
									<div className=' mx-auto' key={project?.projectId}>
										<ProjectCard
											key={project?._id}
											image={project?.displayImage}
											name={project?.title}
											builder={project?.subtitle}
											price={(() => {
												if (project?.configurations.length > 0) {
													const price = project.configurations[0].price;

													if (price < 1) {
														// Convert price less than 1 to Lakh (e.g., 0.123 becomes 12.3 Lakh)
														return `${(price * 100).toFixed(1)} Lakh`;
													} else {
														// Convert price greater than or equal to 1 to Cr (e.g., 1.234 becomes 1.2 Cr)
														return `${price.toFixed(1)} Cr`;
													}
												}
												return null; // Return null if no configurations exist
											})()}
											bhk={(() => {
												const bhkConfigurations = project?.configurations
													.map((item) => item.config.match(/\d+/)) // Extract numbers
													.filter((config) => config) // Filter valid numbers
													.map(Number) // Convert to numbers
													.sort((a, b) => a - b); // Sort the configurations in ascending order

												if (bhkConfigurations.length === 1) {
													// Single configuration
													return `${bhkConfigurations[0]} BHK`;
												} else if (
													bhkConfigurations.length > 1 &&
													bhkConfigurations[bhkConfigurations.length - 1] -
														bhkConfigurations[0] ===
														bhkConfigurations.length - 1
												) {
													// Continuous range of configurations
													return `${bhkConfigurations[0]} - ${
														bhkConfigurations[bhkConfigurations.length - 1]
													} BHK`;
												} else {
													// Multiple non-continuous configurations
													return bhkConfigurations.join(", ") + " BHK";
												}
											})()}
											location={project?.location.area}
											domain={project?.domain}
											desc={project?.description}
											projectId={project?._id}
											isFav={project?.isFav}
										/>
									</div>
								))}
							</>
						) : (
							<div className='mx-auto  my-2 text-xl'>
								No Projects Found In This Category
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Listings;
