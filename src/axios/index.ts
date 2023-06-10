import axios from 'axios';

const $api = axios.create({
    withCredentials:true,
    baseURL:import.meta.env.VITE_API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})

export default $api;