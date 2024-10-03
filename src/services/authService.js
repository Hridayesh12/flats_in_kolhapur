import instance from "../config/api";


export const loginAndOtpRoutes = async ({ phone, name, otp }) => {
    try {
        const response = await instance({
            url: `loginRouter/login`,  // Fetches all Projects
            method: 'POST',
            data: { phone, name, otp }
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getCurrentLead = async () => {
    try {
        const response = await instance({
            url: `loginRouter/login`,  // Fetches all Projects
            method: 'GET',
        });
        return response.data;
    } catch (error) {
        return error;
    }
};