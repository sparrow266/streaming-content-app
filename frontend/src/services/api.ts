import axios from 'axios';

// Define the base URL for the API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define types for our streaming content
export interface StreamingContent {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  created_at: string;
}

// API service methods
export const streamingApi = {
  // Get all streaming content items
  getAll: async (): Promise<StreamingContent[]> => {
    const response = await api.get('/streaming');
    return response.data;
  },

  // Get a single streaming content item by ID
  getById: async (id: number): Promise<StreamingContent> => {
    const response = await api.get(`/streaming/${id}`);
    return response.data;
  },

  // Create a new streaming content item (protected)
  create: async (data: Omit<StreamingContent, 'id' | 'created_at'>): Promise<StreamingContent> => {
    const response = await api.post('/streaming', data);
    return response.data;
  },

  // Update a streaming content item (protected)
  update: async (id: number, data: Partial<Omit<StreamingContent, 'id' | 'created_at'>>): Promise<StreamingContent> => {
    const response = await api.put(`/streaming/${id}`, data);
    return response.data;
  },

  // Delete a streaming content item (protected)
  delete: async (id: number): Promise<void> => {
    await api.delete(`/streaming/${id}`);
  },
};

// Auth types
export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    username: string;
  };
  access_token: string;
}

// Auth service methods
export const authApi = {
  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Register user
  register: async (data: LoginData & { username: string }): Promise<Omit<AuthResponse, 'access_token'>> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

export default api;
