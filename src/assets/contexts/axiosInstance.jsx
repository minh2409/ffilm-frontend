import axios from 'axios';

// Function to get a cookie by name
const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://ffilm.onrender.com/api', // Your API base URL
});

// Add a request interceptor to include the access token in the headers
axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie('refreshToken'); // Function to get refresh token from cookie
        const response = await axios.post('https://ffilm.onrender.com/api/user/refreshToken', { token: refreshToken });
        const newAccessToken = response.data.accessToken;
        sessionStorage.setItem('token', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
        // Redirect to login or handle error appropriately
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
