import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// This interceptor adds the auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- NEW CODE: Add a response interceptor to handle auth errors ---
apiClient.interceptors.response.use(
  (response) => {
    // If the request was successful, just return the response
    return response;
  },
  (error) => {
    // Check if the error is a 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      console.log("Token expired or invalid, logging out.");
      localStorage.removeItem('authToken');
      // Redirect to the login page
      window.location.href = '/login';
    }
    // For all other errors, just pass them on
    return Promise.reject(error);
  }
);

export default apiClient; 