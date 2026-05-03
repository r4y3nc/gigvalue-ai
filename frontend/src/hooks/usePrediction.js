import { useState } from 'react';
import { predictRate } from '../services/api';

const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = async (profileData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await predictRate(profileData);
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, predict };
};

export default usePrediction;