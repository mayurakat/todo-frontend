import axios from 'axios';
import { Task, ContextItem } from './types';
import type { AxiosResponse } from 'axios';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const client = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to include Authorization header except for login/register
client.interceptors.request.use((config) => {
  const isAuthRoute = config.url?.includes('/login/') || config.url?.includes('/register/');
  if (!isAuthRoute) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Token ${token}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));



export const getTasks = async () => client.get<Task[]>('/tasks/').then((r: AxiosResponse<Task[]>) => r.data);
export const getTask = async (id: string | number) => client.get<Task>(`/tasks/${id}/`).then((r: AxiosResponse<Task>) => r.data);
export const createTask = async (payload: Task) => client.post<Task>('/tasks/', payload).then((r: AxiosResponse<Task>) => r.data);
export const updateTask = async (id: string | number, payload: Task) => client.put<Task>(`/tasks/${id}/`, payload).then((r: AxiosResponse<Task>) => r.data);
export const deleteTask = async (id: string | number) => client.delete(`/tasks/${id}/`).then((r: AxiosResponse) => r.data);

// Context
export const getContext = async () => client.get<ContextItem[]>('/contexts/').then((r: AxiosResponse<ContextItem[]>) => r.data);
export const createContext = async (payload: ContextItem) => client.post<ContextItem>('/contexts/', payload).then((r: AxiosResponse<ContextItem>) => r.data);

// AI
export const getAISuggestions = async (payload: any) => client.post('/ai-suggestions/', payload).then((r: AxiosResponse) => r.data);

// Extras
export const getCategories = async () => client.get<{ id:number; name:string }[]>('/categories/').then((r: AxiosResponse<{ id:number; name:string }[]>) => r.data);
export const createCategory = async (payload: { name: string }) => client.post('/categories/', payload).then((r: AxiosResponse<{ id:number; name:string }>) => r.data);
export const getPreferences = async () => client.get('/preferences/').then((r: AxiosResponse) => r.data);
export const updatePreferences = async (payload:any) => client.post('/preferences/', payload).then((r: AxiosResponse) => r.data);

export const login = async (username: string, password: string) => {
  return client.post('/login/', { username, password })
    .then((r: AxiosResponse) => {
      console.log('Login response:', r);
      const data = r.data;
      if (data && data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    })
    .catch((error) => {
      console.error('Login error:', error);
      throw error.response ? error.response.data : error;
    });
};

export const logOut = async () => {
  localStorage.removeItem('token');
  await client.post('/logout/').catch(() => {});
};

export const register = async (email: string,username:string, password: string) => {
  return client.post('/register/', { email,username, password }) 
  .then((r: AxiosResponse) => r.data)
  .catch((error) => {
    console.error('Registration error:', error);
    throw error.response ? error.response.data : error;
  }
  );
};

export default client;
