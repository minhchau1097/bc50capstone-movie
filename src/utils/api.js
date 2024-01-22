import axios from "axios";
const api = axios.create({
    baseURL: 'http://localhost:8080/api/'
})
export const DOMAIN_IMG = 'http://localhost:8080/public/img/'
api.interceptors.request.use((config) => {
    const accessToken = JSON.parse(localStorage.getItem('UserAdmin'))?.accessToken || JSON.parse(localStorage.getItem('Customer'))?.accessToken;
    config.headers = {
        ...config.headers,
        // TokenCybersoft:
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MCIsIkhldEhhblN0cmluZyI6IjE0LzAxLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNTE5MDQwMDAwMCIsIm5iZiI6MTY3NzQzMDgwMCwiZXhwIjoxNzA1MzM4MDAwfQ.k7Kzay9-bYUjN7pTcMrYpgTq5Xe5U6jdvM1OUQ5L_2A",
        Authorization: `Bearer ${accessToken}`,
    }
    return config;
})

export default api;