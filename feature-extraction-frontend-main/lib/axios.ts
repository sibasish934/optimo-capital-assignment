import axios from 'axios';
import { API_URL } from '@/env/client-env';

export const axiosClient = axios.create({
    baseURL: API_URL,
});
