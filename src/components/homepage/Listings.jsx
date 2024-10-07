import { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
// import InfiniteScroll from "react-infinite-scroll-component";
import { setFilters, setOffset } from "../../store/features/filterSlice";
import { fetchAllProjects } from "../../services/projectService";
import {
	setNextProjects,
	setProjects,
} from "../../store/features/projectSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const Listings = () => {
	const projects = useSelector((state) => state.projects.projects);
	const totalProjects = useSelector((state) => state.projects.totalProjects);
	const hasMore = useSelector((state) => state.projects.hasMore);
	const dispatchEvent = useDispatch();

	console.log("Has More", hasMore);
	const filters = useSelector((state) => state.filters);
	const limit = filters.limit;
	const offset = filters.offset;

	const initialFetch = async () => {
    dispatchEvent(
      setFilters( {
        type: 'flat',
        config: null,
        area: null,
        minPrice: 100000,
        maxPrice: 50000000,
        possessionStatus: null,
        limit: 3,
        offset: 0
})
    )
		const params = filters;
		const response = await fetchAllProjects({ params });
		console.log("Response From Initial Fetch", response);
		dispatchEvent(setProjects(response.data));
	};

	const fetchMoreData = async () => {
		console.log("Hitting Again With");
		dispatchEvent(
			setOffset({
				newOffset: limit,
			})
		);
		const params = filters;

		const response = await fetchAllProjects({ params });
		dispatchEvent(setNextProjects(response.data));
	};
	const filterFetch = async () => {
		const params = filters;
		const response = await fetchAllProjects({ params });
		dispatchEvent(setProjects(response.data));
	};
	useEffect(() => {
		dispatchEvent(
			setFilters({
				limit: 3,
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
				{/* Set a width that matches the ProjectCard */}
				<p className='text-left w-80'>Total Properties: {totalProjects}</p>
			</div>

			<InfiniteScroll
				dataLength={totalProjects}
				next={fetchMoreData} // Function to fetch the next batch
				hasMore={projects?.length !== totalProjects}
				loader={<h4>Loading...</h4>}
				endMessage={<p style={{ textAlign: "center" }}>{totalProjects > 0 && `You’re all caught up!`}</p>}>
				<div className={`flex w-screen flex-wrap relative gap-2 px-0 sm:px-8 mx-auto`}>
					{projects?.map((project) => (
						<div className=' mx-auto' key={project.projectId}>
							<ProjectCard
								key={project._id}
								image={project.displayImage}
								name={project.title}
								builder={project.subtitle}
								price={project.configurations
									.map((item) => item.price)
									.filter((config) => config)
									.join("-")}
								priceUnit={project.configurations[0].priceUnit}
								bhk={project.configurations
									.map((item) => item.config.match(/\d+/))
									.filter((config) => config)
									.join(", ")}
								location={project.location.area}
								domain={project.domain}
								desc={project.description}
								projectId={project._id}
								isFav={project.isFav}
							/>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
};

export default Listings;
