import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

api.interceptors.response.use(
  (response) => response, // If the request is 200-299, just return the response
  (error) => {
    // Check if the server sent a JSON error message
    const message = error.response?.data?.message || 'An unexpected error occurred';
    const status = error.response?.status;

    // Global handling based on status codes
    if (status === 401) {
      console.error("Unauthorized: Redirecting to login...");
      // Optional: window.location.href = '/login';
    } else if (status === 403) {
      console.error("Forbidden: You don't have permission.");
    } else if (status >= 400 && status < 500) {
      console.warn(`Client Error (${status}): ${message}`);
    
    } else if (status >= 500) {
      console.error("🔥 Server Error: Please try again later.");
    }

    // Still reject the promise so the specific component can handle it if needed
    return Promise.reject(error);
  }
);

export default api;