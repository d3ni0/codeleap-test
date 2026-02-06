import axios from 'axios';

const BASE_URL = 'https://dev.codeleap.co.uk/careers/';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postsAPI = {
  getAll: (params = '') => api.get(params),
  create: (data) => api.post('', data),
  update: (id, data) => api.patch(`${id}/`, data),
  delete: (id) => api.delete(`${id}/`),
};
