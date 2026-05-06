import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictRate = async (profileData, token) => {
  const response = await api.post('/api/predict', profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getHistory = async (token) => {
  const response = await api.get('/api/predictions', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getSkills = async () => {
  const response = await api.get('/api/skills');
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/api/categories');
  return response.data;
};

export const getExperienceLevels = async () => {
  const response = await api.get('/api/experience-levels');
  return response.data;
};

export const getProfile = async (token) => {
  const response = await api.get('/api/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const saveProfile = async (profileData, token) => {
  const response = await api.post('/api/profile', profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default api;