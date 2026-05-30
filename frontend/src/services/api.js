import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Map experience level dari frontend ke format FastAPI
const EXPERIENCE_MAP = {
  beginner: 'Entry level',
  intermediate: 'Intermediate',
  expert: 'Expert',
};

export const predictRate = async ({ 
  category, 
  experience_level, 
  skills, 
  description,
  country,
  client_rating,
  client_review_count 
}) => {
  const response = await api.post('/api/predict', {
    category,
    experience_level: EXPERIENCE_MAP[experience_level] || experience_level,
    skills, 
    description,
    country,
    client_rating: Number(client_rating) || 0.0,
    client_review_count: Number(client_review_count) || 0
  });
  return response.data;
};

export const getSkills = async () => {
  const response = await api.get('/api/skills');
  return response.data;
};

export const getSuggestions = async () => {
  const response = await api.get('/api/suggestions');
  return response.data;
};

export const getSuggestionsByRole = async (role) => {
  const response = await api.get(`/api/suggestions/${encodeURIComponent(role)}`);
  return response.data;
};

export default api;