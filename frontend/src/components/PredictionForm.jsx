import { useState } from 'react';

const PredictionForm = ({ onSubmit, loading }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ description });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Describe Your Freelancer Profile
      </h2>
      <div className="mb-4">
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          rows={5}
          placeholder="e.g. I am a fullstack developer with 3 years of experience in React and Node.js..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading || description.length < 20}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Predicting...' : 'Get Hourly Rate Recommendation'}
      </button>
    </div>
  );
};

export default PredictionForm;