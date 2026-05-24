import { useState } from 'react';
import { predictRate } from '../services/api';

const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = async ({ category, experience_level, skills, description }) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await predictRate({
        category,
        experience_level,
        skills,
        description,
      });
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return { result, loading, error, predict, reset };
};

export default usePrediction;
