import axios from "axios";
import instance from "../config/api";

import { getCurrentLead } from "./authService";


export const fetchAllProjects = async ({ params }) => {
    const resp = await getCurrentLead();
    let newParams = params;
    if (resp?.data?._id) {
        newParams = { ...params, lead: resp.data._id };
    }
    // console.log("NewParam Check For Hitting Again with Offset", newParams);
    try {
        const response = await instance({
            url: `projectRouter/projects`,  // Fetches all Projects
            method: 'GET',
            params: newParams
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const fetchProjectByDomain = async (domain) => {
    try {
        const response = await instance({
            url: `projectRouter/projects/${domain}`,  // Fetches Project By Id
            method: 'GET',
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const postLeadToProject = async (projectId) => {
    // console.log(projectId);
    try {
        const response = await instance({
            url: `projectRouter/projectLead/${projectId}`,  // Fetches Project By Id
            method: 'POST',
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const postPutFavoriteProject = async (projectId) => {
    try {
        const response = await instance({
            url: `projectRouter/favorites/${projectId}`,  // Fetches Project By Id
            method: 'POST',
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
export const getFavorites = async (projectId) => {
    // console.log(projectId);
    try {
        const response = await instance({
            url: `projectRouter/favorites`,  // Fetches Project By Id
            method: 'GET',
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const handleDownload = async (url) => {
    console.log(url);
    try {
        const response = await axios.get(url.brochureurl, {
            responseType: 'blob', // Important for handling binary data
        });

        console.log("Response", response);
        // Extract filename from the URL
        const filename = url.brochureurl.split('/').pop(); // Get the last part of the URL

        // console.log("Filename", filename);
        // Create a URL for the file
        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);

        // console.log("Blob", blob, "Download Url", downloadUrl);
        // Create a link element
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename); // Use the extracted filename

        // console.log("Link", link);
        // Append to the body and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl); // Clean up the URL object
    } catch (error) {
        // console.error('Error downloading the file:', error);
    }
};
