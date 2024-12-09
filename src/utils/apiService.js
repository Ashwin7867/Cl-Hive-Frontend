import axios from "axios";

const api = axios.create({
  baseURL: "https://1e3e-114-143-184-122.ngrok-free.app", // Replace with your API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request/response interceptors for additional logic
api.interceptors.request.use(
  (config) => {
    // Add auth token or other headers here, if needed
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
