import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import SkillsBadge from '../components/SkillsBadge';
import usePrediction from '../hooks/usePrediction';

const Home = () => {
  const { result, loading, error, predict } = usePrediction();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">GigValue AI</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Get a realistic hourly rate recommendation based on your freelancer profile.
        </p>
      </div>
      <PredictionForm onSubmit={predict} loading={loading} />
      <PredictionResult result={result} error={error} />
      <SkillsBadge />
    </div>
  );
};

export default Home;