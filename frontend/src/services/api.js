import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const predictRate = async (profileData) => {
  const response = await api.post('/api/predict', profileData);
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/api/predictions');
  return response.data;
};

export const getSkills = async () => {
  const response = await api.get('/api/skills');
  return response.data;
};

export default api;