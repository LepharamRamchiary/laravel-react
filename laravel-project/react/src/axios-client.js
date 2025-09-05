import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    // headers: {    
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    // },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = errror;

        if(response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
        } 

        throw error;
    }
);

export default axiosClient;