import { useEffect, useState } from 'react';
import { getHistory } from '../services/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory()
      .then((res) => setHistory(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 Prediction History</h1>
      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500 text-sm">No predictions yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow p-5">
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="text-indigo-600 font-bold text-lg">
                ${item.predicted_rate} / hour
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;