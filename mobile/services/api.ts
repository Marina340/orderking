import axios, { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Storage helper that works on both web and native
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async deleteItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

// Get API URL from config or use default
const getApiUrl = () => {
  // Try to get from expo config
  const configUrl = Constants.expoConfig?.extra?.apiUrl;
  
  console.log('🔍 Platform:', Platform.OS);
  console.log('🔍 Config URL:', configUrl);
  console.log('🔍 Constants.expoConfig:', Constants.expoConfig);
  
  if (configUrl) {
    console.log('✅ Using config URL:', configUrl);
    return configUrl;
  }
  
  // Fallback for web
  if (Platform.OS === 'web') {
    console.log('🌐 Using web fallback URL');
    return 'http://localhost:5000/api';
  }
  
  // Fallback for mobile (use your computer's IP for testing)
  console.log('📱 Using mobile fallback URL');
  return 'http://192.168.1.100:5000/api';
};

const API_URL = getApiUrl();

console.log('📡 Final API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    const token = await storage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token added to request');
    } else {
      console.log('⚠️ No token found');
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  async (error: AxiosError) => {
    console.error('❌ API Error:', error.config?.url, error.response?.status, error.message);
    if (error.response?.data) {
      console.error('❌ Error data:', error.response.data);
    }
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage
      await storage.deleteItem('token');
      await storage.deleteItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;
export { storage };

export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (error.message) {
      return error.message;
    }
  }
  return 'An unexpected error occurred';
};
