import { ENV } from '@/config/enviroments';
import axios, { AxiosInstance } from 'axios';

export const API: AxiosInstance = axios.create({
  baseURL: ENV.BACKEND_API_URL,
});
