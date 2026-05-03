const PredictionResult = ({ result, error }) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6 text-sm">
        ⚠️ {error}
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-indigo-700 mb-2">
        💡 Recommended Hourly Rate
      </h2>
      <p className="text-4xl font-bold text-indigo-600">
        ${result.predicted_rate} <span className="text-base font-normal text-gray-500">/ hour</span>
      </p>
    </div>
  );
};

export default PredictionResult;