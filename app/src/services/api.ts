import axios from 'axios';

import { MOVIES_API_BASE_URL, MOVIES_API_KEY } from '@env';

export const api = axios.create({
  baseURL: MOVIES_API_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${MOVIES_API_KEY}`,
  },
});
