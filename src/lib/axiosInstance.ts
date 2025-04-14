import axios, { AxiosInstance } from "axios";

const isBrowser = typeof window !== "undefined";

const api: AxiosInstance = axios.create({
    timeout: 50000,
    withCredentials: true,
    baseURL: "https://recruter-backend.vercel.app/api",
});

api.interceptors.request.use(
    (config: any) => {
        if (isBrowser) {
            const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
            console.log("token", token);
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        config.headers = {
            ...config.headers,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
