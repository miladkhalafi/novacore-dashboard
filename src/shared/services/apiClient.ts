import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('token')
      // You can add redirect logic here if needed
    }
    return Promise.reject(error)
  }
)

export { apiClient }
export type { AxiosRequestConfig, AxiosResponse }

