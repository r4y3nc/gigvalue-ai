import { useState, useEffect } from 'react';
import { getProfile, getCategories, predictRate } from '../services/api';

const QUICK_CATEGORIES = [
  'Front End Developer',
  'Data Scientist',
  'Prompt Engineer',
  'UI/UX Designer',
];

const Home = ({ session }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [result, setResult] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [profileRes, categoriesRes] = await Promise.all([
        getProfile(session.access_token),
        getCategories(),
      ]);

      const profileData = profileRes.data;
      setCategories(categoriesRes.data.categories);

      if (profileData) {
        setDescription(profileData.description || '');
        setSkills(profileData.skills || []);
        setExperienceLevel(profileData.experience_level || '');
      }
    };

    fetchData();
  }, []);

  const getMinMax = (avg) => {
    const min = +(avg * 0.5).toFixed(2);
    const max = +(avg * 1.5).toFixed(2);
    return { min, max };
  };

  const getSliderRate = (avg) => {
    const { min, max } = getMinMax(avg);
    const rate = min + ((max - min) * sliderValue) / 100;
    return +rate.toFixed(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setSliderValue(50);
    try {
      const res = await predictRate({
        category,
        experience_level: experienceLevel,
        description,
        skills,
      }, session.access_token);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-3">
          Temukan Tarif Jasa Anda di Pasar Global.
        </h1>
        <p className="text-center text-gray-400 text-sm mb-8">
          Masukkan peran atau keahlian Anda, kami akan memprediksi tarif paling kompetitif.
        </p>

        {/* Search Bar */}
        <div className="flex border border-gray-200 mb-2">
          <div className="flex items-center px-4 text-gray-400"></div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 py-4 text-sm text-gray-700 focus:outline-none bg-white"
          >
            <option value="">e.g. frontend developer, react js, backend...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            disabled={loading || !category || !experienceLevel || description.length < 20}
            className="bg-black text-white px-8 text-sm font-medium hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Cari'}
          </button>
        </div>

        {/* Info experience level */}
        {experienceLevel && (
          <p className="text-xs text-gray-400 mb-4">
            Level pengalaman: <span className="font-medium text-gray-600">{experienceLevel}</span>
            {' '}· <a href="/profile" className="underline hover:text-black">Ubah di profil</a>
          </p>
        )}

        {!experienceLevel && (
          <p className="text-xs text-red-400 mb-4">
            Belum ada level pengalaman. <a href="/profile" className="underline">Set di profil</a>
          </p>
        )}

        {/* Data powered by */}
        <p className="text-center text-xs text-gray-400 mb-6">Data powered by Upwork</p>

        {/* Quick Select */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`border px-4 py-2 text-sm transition ${
                category === cat
                  ? 'border-black text-black'
                  : 'border-gray-200 text-gray-600 hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center mb-4">{error}</p>
        )}

        {/* Result */}
        {result && (() => {
          const avg = result.predicted_rate;
          const { min, max } = getMinMax(avg);
          const currentRate = getSliderRate(avg);

          return (
            <div className="border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Estimasi Tarif</p>
                <p className="text-4xl font-bold text-gray-900">
                  ${currentRate}{' '}
                  <span className="text-base font-normal text-gray-400">/ jam</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">Berdasarkan data Upwork</p>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-gray-900 mb-4">Rentang Tarif</p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full accent-black mb-2"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Di bawah standar (${min})</span>
                  <span>Area Ideal (${avg})</span>
                  <span>Di atas rata-rata (${max})</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default Home;