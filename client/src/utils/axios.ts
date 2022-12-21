//@Author(s) s184230

import axios from "axios";

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const devURL = 'http://localhost:3002'
const prodURL = 'http://se2-e.compute.dtu.dk:3002'

const axiosInstance = axios.create({
    baseURL: development ? devURL : prodURL
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error
            // (error.response && error.response.data) || error.message || 'Something went wrong'
        );
    }
);

export default axiosInstance;