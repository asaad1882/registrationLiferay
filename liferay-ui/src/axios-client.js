import axios from "axios";
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_USER_API_BASE_URL}`
  })
  
  axiosClient.interceptors.request.use((config) => {
    config.headers['x-api-key'] = `${import.meta.env.VITE_USER_API_TOKEN}`;
    return config;
  })
  export default axiosClient