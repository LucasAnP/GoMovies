import { MOVIES_API_BASE_URL, MOVIES_API_KEY } from '@env';
import axios from 'axios';

export const api = axios.create({
  baseURL: MOVIES_API_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${MOVIES_API_KEY}`,
  },
});
