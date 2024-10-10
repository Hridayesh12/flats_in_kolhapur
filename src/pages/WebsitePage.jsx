import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import {
	fetchProjectByDomain,
	handleDownload,
	postLeadToProject,
} from "../services/projectService";
import { getCurrentLead } from "../services/authService";
import { useAuth } from "../contexts/AuthProvider";
import { assetsUrl, fileUrl } from "../config/url";
import RenderCarousel from "../components/dynamicpage/RenderCarousel";
import ImgGallery from "../components/dynamicpage/ImgGallery";
import ContactUs from "../components/ContactUs";
import { toast } from "react-toastify";

function WebsitePage() {
	const navigate = useNavigate('/');
	const location = useLocation();
	const domain = location.pathname.split("/")[1];
	const [project, setProject] = useState(null);
  const [downloadState, setDownloadState] = useState(false);
	const { openLogin, loginOpen, closeLogin } = useAuth();

	const fetchProject = async (domain) => {
    
		try {
			const response = await fetchProjectByDomain(domain);
			// console.log(response);
			const projectData = response.data;
			// Format the data as per your requirement
			const fetchedProject = {
				projectId: projectData.projectId._id,
				title: projectData.projectId.title,
				subtitle: projectData.details.subtitle,
				description: projectData.projectId.description,
				logo: projectData.projectId.logoUrl,
				gallery: projectData.details.gallery,
				floorPlan: projectData.details.floorPlan,
				location:
					projectData.projectId.location.area +
					", " +
					projectData.projectId.city,
				projectFeatures: projectData.details.projectFeatures,
				nearByPlaces:
					projectData.projectId.nearByPlaces.length >= 0
						? projectData.projectId.nearByPlaces.map((place, index) => {
								return place["name"];
						  })
						: "N/A",
				externalSpecifications: projectData.details.externalFeatures,
				internalSpecifications: projectData.details.internalFeatures,
				configuration:
					projectData.projectId.configurations.length >= 0
						? projectData.projectId.configurations
								.map((config) => {
									return config.config;
								})
								.join(" , ")
						: "N/A",
				locationLink: projectData.projectId.location.gmap,
				status: projectData.projectId.possessionStatus,
				possessionBy: projectData.details.possessionBy,
				reraNo: projectData.details.reraNo,
				constructionGallery: projectData.details.constructionGallery,
				brochure: projectData.details.brochure[0],
				displayImage: projectData.projectId.displayImage,
			};
			setProject(fetchedProject);
		} catch (error) {
			// console.error("Error fetching project data:", error.status);
			openLogin();
		}
	};

	//Handle Download Brochure Logic -

	const handleDownloadBrochure = async () => {
    
		const resp = await getCurrentLead();
		// console.log("Resp", resp);

		if (resp.status > 250) {
			// console.log("Working");
			openLogin();
		} else {
			closeLogin();
			const leadDetails = resp.data;
			let resp2 = "";
			if (project?.projectId) {
				resp2 = await postLeadToProject(project.projectId);
			}
			if (resp2.status === "success") {
				setDownloadState(true);
				await handleDownload({ brochureurl: `${project?.brochure}` });
        toast('Pdf Download Successful');
        setDownloadState(false);
			}
		}
	};
	// Fetch or set project data here
	useEffect(() => {
		// console.log(domain);

		fetchProject(domain);
	}, [loginOpen]);

	const sanitizeHtml = (html) => {
		return html.replace(/<script[^>]*>|<\/script>/gi, "");
	};

	return (
		<>
			{project ? (
				<div className='px-4 sm:px-8 md:px-16 pb-5 mx-auto max-w-[1500px] relative'>
					<Helmet>
						<meta
							name={`Website of ${project?.title}`}
							content='width=device-width, initial-scale=1.0'
						/>
						<meta property='og:title' content={`${project?.title}`} />
						<meta
							property='og:description'
							content={`${project?.description}`}
						/>
						<meta
							property='og:image'
							content={`${`${project?.displayImage}`}`}
						/>
						<meta
							property='og:url'
							content={`${`https://flats-in-kolhapur.vercel.app/${domain}`}`}
						/>
						<meta property='og:type' content='website' />
						<title>{project?.title}</title>
					</Helmet>

					<div className='max-w-xs mt-5 mb-8'>
						<img
							src={`${project?.logo}`}
							alt='Project Logo'
							className='h-auto w-full object-cover'
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3'>
						<div className='bg-[#a17945] p-6 text-sm h-full md:col-span-2 flex flex-col justify-between'>
							<div className='flex flex-col gap-2'>
								<h2 className='text-2xl sm:text-4xl'>{project?.subtitle}</h2>
								<p className='text-md sm:text-lg'>{project?.description}</p>
							</div>

							<div className='mt-5 grid grid-cols-1 md:grid-cols-4 gap-2 text-lg'>
								<div>
									<p className='text-lg sm:text-xl font-bold'>{project?.configuration}</p>
									<p>Configuration</p>
								</div>
								<div>
									<p className='text-lg sm:text-xl font-bold'>{project?.location}</p>
									<p>Location</p>
								</div>
								<div>
									<p className='text-lg sm:text-xl font-bold'>{project?.status}</p>
									<p>Status</p>
								</div>
								<div>
									<p className='text-lg sm:text-xl font-bold'>{project?.possessionBy}</p>
									<p>Possession By</p>
								</div>
							</div>
						</div>

						<div className='bg-[#ecedef] text-center p-3 py-6'>
							<img
								src='/assets/images/rera-logo.png'
								alt='RERA Logo'
								className='mx-auto mb-2 h-32'
							/>
							<h3 className='text-xl sm:text-2xl'>MahaRERA Registration No.</h3>
							<p className='text-lg sm:text-xl font-bold'>{project?.reraNo}</p>
							<div className='flex flex-col items-center justify-center'>
								<p className='text-md sm:text-lg mt-2'>Available at</p>
								<a
									href='https://maharerait.mahaonline.gov.in/'
									target='_blank'
									rel='noopener noreferrer'
									className='text-black no-underline text-md sm:text-lg'>
									https://maharerait.mahaonline.gov.in
								</a>
							</div>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-2 my-2'>
						{/* First Column: File Upload Section */}
						<div className='md:col-span-2 h-fit'>
							<div className='h-full'>
								<h5 className='text-2xl sm:text-4xl my-4'>Gallery</h5>
								{project.gallery.length > 0 ? (
									<div className='mt-2 h-fit border-x-2 border-base-100'>
										<RenderCarousel file={project?.gallery} />
									</div>
								) : 'Gallery will be added soon'}
							</div>
						</div>

						{/* Second Column: Project Features */}
						<div className='flex flex-col min-h-full h-full pl-0 pt-2 md:pt-0'>
							<div className='flex-1 min-h-full flex flex-col'>
								<h5 className='text-2xl sm:text-4xl my-4'>Project Features</h5>
								<div className='bg-base-600 text-base-100 flex-1'>
									<div className='flex flex-col items-start gap-2 overflow-auto p-6'>
										{project.projectFeatures.map((feature, index) => (
											<div
												className='flex items-start mb-2 text-xl sm:text-2xl'
												key={index}>
												<span
													className='block h-2 w-2 bg-base-100 mr-2 mt-2.5'
												/>
												<span className='flex-1 flex items-start'>
													{feature}
												</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					{downloadState ? 
          <button
         disabled
          className='bg-base-500 text-base-100 mt-10 text-white py-2 px-4 rounded mb-2 text-xl'>
          Downloading...
        </button> :
        <button
        onClick={() => {
          handleDownloadBrochure();
        }}
        className='bg-base-600 text-base-100 mt-10 text-white py-2 px-4 rounded mb-2 text-xl'>
        Download
      </button>}

					<div className='my-2 grid grid-cols-1 md:grid-cols-3 gap-2'>
						<div className='md:col-span-2'>
							<h2 className='text-2xl sm:text-4xl my-4'>Floor Plan</h2>
							{project?.floorPlan.length > 0 ? (
								<div className='mt-2'>
									<RenderCarousel file={project?.floorPlan} />
								</div>
							) : 'Floor Plan will be added soon'}
						</div>

						<div className='md:col-span-1'>
							<h2 className='text-2xl sm:text-4xl my-4'>Construction Gallery</h2>
							{project?.constructionGallery.length > 0 ? (
								<ImgGallery imagesArray={project?.constructionGallery} />
								
							) : 
							<div className="grid grid-cols-2 gap-2 w-full h-full">
							
								<img src={`${assetsUrl}/assets/images/images.png`} alt="Construction Gallery Image" className="h-[100px] sm:h-[200px] object-cover"/>
								<img src={`${assetsUrl}/assets/images/images.png`} alt="Construction Gallery Image" className="h-[100px] sm:h-[200px] object-cover"/>
								<img src={`${assetsUrl}/assets/images/images.png`} alt="Construction Gallery Image" className="h-[100px] sm:h-[200px] object-cover"/>
						
							</div>
							}
						</div>
					</div>

          {downloadState ? 
          <button
         disabled
          className='bg-base-500 text-base-100 mt-10 text-white py-2 px-4 rounded mb-2 text-xl'>
          Downloading...
        </button> :
        <button
        onClick={() => {
          handleDownloadBrochure();
        }}
        className='bg-base-600 text-base-100 mt-10 text-white py-2 px-4 rounded mb-2 text-xl'>
        Download
      </button>}


          <h2 className='text-2xl sm:text-4xl my-6'>Specifications</h2>
					<div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 bg-base-300 text-base-600 px-4'>
      
						<div className='flex flex-col items-start gap-2 overflow-auto p-2'>
							<div className='flex items-start mb-2'>
								<span
									className='block h-2 w-2 bg-base-600 mr-2 mt-6'></span>
								<h5 className='text-lg sm:text-xl my-4 font-bold'>
									INTERNAL SPECIFICATIONS
								</h5>
							</div>

							{project.internalSpecifications.map((feature, index) => (
								<div className='flex items-start mb-2 text-lg sm:text-xl ' key={index}>
									<span
										className='block h-2 w-2 bg-base-600 mr-2 mt-2.5'
									/>
									<span className='flex-1 flex items-start'>{feature}</span>
								</div>
							))}
						</div>
						<div className='flex flex-col items-start gap-2 overflow-auto p-2'>
							<div className='flex items-start mb-2'>
								<span
									className='block h-2 w-2 bg-base-600 mr-2 mt-6'></span>
								<h5 className='text-lg sm:text-xl  my-4 font-bold'>
									EXTERNAL SPECIFICATIONS
								</h5>
							</div>

							{project.externalSpecifications.map((feature, index) => (
								<div className='flex items-start mb-2 text-lg sm:text-xl ' key={index}>
									<span
										className='block h-2 w-2 bg-base-600 mr-2 mt-2.5'
									/>
									<span className='flex-1 flex items-start'>{feature}</span>
								</div>
							))}
						</div>
					</div>

					<div className='my-1 grid grid-cols-1 md:grid-cols-3 gap-2'>
						<div className='flex flex-col min-h-fit p-0'>
							<div className='flex-1 min-h-fit flex flex-col'>
								<h2 className='text-4xl my-4'>Nearby Places</h2>
								<div className='bg-base-300 flex-1'>
									<ul className='p-6 space-y-2 overflow-auto'>
										{project?.nearByPlaces.map((nearByPlace, index) => (
                      <li className='flex items-start mb-2 text-lg sm:text-xl' key={index}>
                      <span
                        className='block h-2 w-2 bg-base-600 mr-2 mt-2.5'
                      />
                      <span className='flex-1 flex items-start'>{nearByPlace}</span>
                    </li>
										))}
									</ul>
								</div>
							</div>
						</div>

						<div className='md:col-span-2'>
							<h2 className='text-4xl my-4'>Location Map</h2>
							<div
								dangerouslySetInnerHTML={{
									__html: sanitizeHtml(project?.locationLink),
								}}
							/>
						</div>
					</div>

					<div className='w-full h-full bg-base-600 mt-3'>
				<ContactUs />
			</div>
			<div className='text-base-100 bg-base-600 fixed z-50 bottom-6 right-2 sm:right-20 border-2 borer-base-400 rounded-full p-4 shadow-4xl'>
							<svg 
							onClick={()=>{navigate('/')}}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-8'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
								/>
							</svg>
						</div>
				</div>
			) : (
				""
			)}
			
		</>
	);
}

export default WebsitePage;
