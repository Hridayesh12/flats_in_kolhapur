import instance from "../config/api";
export const fetchAllLocations = async () => {
    try {
        const response = await instance({
            url: `projectRouter/locations`,  // Fetches all Projects
            method: 'GET',
        });
        return response.data;
    } catch (error) {
        return error;
    }
};