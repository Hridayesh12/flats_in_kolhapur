import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import {
  fetchProjectByDomain,
  handleDownload,
  postLeadToProject,
} from "../services/projectService";
import { getCurrentLead } from "../services/authService";
import { useAuth } from "../contexts/AuthProvider";
import { fileUrl } from "../config/url";
import RenderCarousel from "../components/dynamicpage/RenderCarousel";
import ImgGallery from "../components/dynamicpage/ImgGallery";

function WebsitePage() {

  const location = useLocation();
  const domain = location.pathname.split("/")[1];
  const [project, setProject] = useState(null);
  const { openLogin, loginOpen, closeLogin } = useAuth();

  
  const fetchProject = async (domain) => {
    try {
      const response = await fetchProjectByDomain(domain);
      console.log(response);
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
        displayImage: projectData.projectId.displayImage
      };
      setProject(fetchedProject);
    } catch (error) {
      console.error("Error fetching project data:", error.status);
      openLogin();
    }
  };

  //Handle Download Brochure Logic -

  const handleDownloadBrochure = async () => {
    const resp = await getCurrentLead();
    console.log("Resp", resp);
    if (resp.status > 250) {
      console.log("Working");
      openLogin();
    } else {
      closeLogin();
      const leadDetails = resp.data;
      let resp2 = "";
      if (project?.projectId) {
        resp2 = await postLeadToProject(project.projectId);
      }
      if (resp2.status === "success") {
        await handleDownload({ brochureurl: `${fileUrl}${project?.brochure}` });
      }
    }
  };
  // Fetch or set project data here
  useEffect(() => {
    
    console.log(domain);

    fetchProject(domain);
  }, [loginOpen]);

  const sanitizeHtml = (html) => {
    return html.replace(/<script[^>]*>|<\/script>/gi, "");
  };

  return (
    <>
      {project ? (
        <div className="px-4 sm:px-8 md:px-16 pb-5 mx-auto max-w-[1500px]">
          <Helmet>
            <title>{project?.title}</title>
            <meta
              name={`Website of ${project?.title}`}
              content="width=device-width, initial-scale=1.0"
            />
    <meta property="og:title" content={`${project?.title}`} />
    <meta property="og:description" content={`${project?.description}`} />
    <meta property="og:image" content={`${`https://flats-in-kop-backend.vercel.app/v1${project?.displayImage}`}`} />
    <meta property="og:url" content={`${`https://flats-in-kolhapur.vercel.app/${domain}`}`} />
    <meta property="og:type" content="website" />
          </Helmet>

          <div className="max-w-xs mx-auto mt-5 mb-8">
            <img
              src={`${fileUrl}${project?.logo}`}
              alt="Project Logo"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-[#a17945] rounded-l-lg p-6 text-sm h-full md:col-span-2 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl">{project?.subtitle}</h2>
                <p>{project?.description}</p>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-2">
                <div>
                  <p className="font-bold">Configuration</p>
                  <p>{project?.configuration}</p>
                </div>
                <div>
                  <p className="font-bold">Location</p>
                  <p>{project?.location}</p>
                </div>
                <div>
                  <p className="font-bold">Status</p>
                  <p>{project?.status}</p>
                </div>
                <div>
                  <p className="font-bold">Possession By</p>
                  <p>{project?.possessionBy}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#ecedef] rounded-r-lg text-center p-3">
              <img
                src="/assets/images/rera-logo.png"
                alt="RERA Logo"
                className="mx-auto mb-2"
              />
              <h3 className="text-lg">MahaRERA Registration No.</h3>
              <p className="text-lg font-bold">{project?.reraNo}</p>
              <p className="text-lg mt-2">
                Available at
                <br />
                <a
                  href="http://maharera.mahaonline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black no-underline text-sm"
                >
                  http://maharera.mahaonline.gov.in
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-2 borde-2 border-solid border-base-600">
            {/* First Column: File Upload Section */}
            <div className="md:col-span-2 h-fit">
              <div className="h-full">
                <h5 className="text-2xl my-4">Gallery</h5>
                {project.gallery.length > 0 && (
                  <div className="mt-2 h-fit border-2 border-base-500">
                    <RenderCarousel file={project?.gallery} />
                  </div>
                )}
              </div>
            </div>

            {/* Second Column: Project Features */}
            <div className="flex flex-col min-h-full h-full pl-0 pt-2 md:pt-0">
              <div className="flex-1 min-h-full flex flex-col">
                <h5 className="text-2xl my-4">Project Features</h5>
                <div className="bg-base-600 text-base-100 flex-1">
                  <div className="flex flex-col items-start gap-2 overflow-auto p-2">
                    {project.projectFeatures.map((feature, index) => (
                      <div className="flex items-center mb-2" key={index}>
                        <span
                          className="block h-2 w-2 bg-base-100 rounded-full mr-1"
                          style={{ width: "8px", height: "8px" }}
                        />
                        <span className="flex-1 flex items-start">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              handleDownloadBrochure();
            }}
            className="bg-base-600 text-base-100 mt-10 text-white py-2 px-4 rounded mb-2"
          >
            Download
          </button>

          <div className="my-2 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="md:col-span-2">
              <h2 className="text-2xl my-4">Floor Plan</h2>
              {project?.floorPlan.length > 0 && (
                <div className="mt-2">
                  <RenderCarousel file={project?.floorPlan} />
                </div>
              )}
            </div>

            <div className="md:col-span-1">
              <h2 className="text-2xl my-4">Construction Gallery</h2>
              {project?.constructionGallery.length > 0 && (
                <ImgGallery imagesArray={project?.constructionGallery} />
              )}
            </div>
          </div>

          <button
            onClick={() => {
              handleDownloadBrochure();
            }}
            className="bg-base-600 text-base-100 mt-10 text-white py-2 px-4 rounded mb-2"
          >
            Download
          </button>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 bg-base-300 text-base-600">
            <div className="flex flex-col items-start gap-2 overflow-auto p-2">
              <h5 className="text-2xl my-4">Internal Specifications</h5>
              {project.internalSpecifications.map((feature, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <span
                    className="block h-2 w-2 bg-base-600 rounded-full mr-1"
                    style={{ width: "8px", height: "8px" }}
                  />
                  <span className="flex-1 flex items-start">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start gap-2 overflow-auto p-2">
              <h5 className="text-2xl my-4">External Specifications</h5>
              {project.externalSpecifications.map((feature, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <span
                    className="block h-2 w-2 bg-base-600 rounded-full mr-1"
                    style={{ width: "8px", height: "8px" }}
                  />
                  <span className="flex-1 flex items-start">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="my-1 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex flex-col min-h-fit p-0">
              <div className="flex-1 min-h-fit flex flex-col">
                <h2 className="text-2xl my-4">Nearby Places</h2>
                <div className="bg-base-300 flex-1">
                  <ul className="p-2 space-y-2 overflow-auto">
                    {project?.nearByPlaces.map((nearByPlace, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-xs mr-1 mt-1 block h-2 w-2 bg-black rounded-full" />
                        {nearByPlace}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-2xl my-4">Location Map</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(project?.locationLink),
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default WebsitePage;
