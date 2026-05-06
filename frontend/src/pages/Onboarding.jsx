import { useState, useEffect } from 'react';
import { getSkills, saveProfile } from '../services/api';

const Onboarding = ({ session, onComplete }) => {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSkills().then((res) => setSkills(res.data.skills));
  }, []);

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchSkill.toLowerCase()) &&
    !selectedSkills.includes(skill)
  );

  const handleSelectSkill = (skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    setSearchSkill('');
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = session.access_token;
      await saveProfile({ description, skills: selectedSkills }, token);
      onComplete();
    } catch (err) {
      setError('Gagal menyimpan profil. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-10 py-6">
        <p className="text-sm font-bold">gigvalue.ai</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">

        {/* Step 1 - Pilih Skills */}
        {step === 1 && (
          <div className="w-full max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
              Apa skill yang kamu miliki sekarang?
            </h1>

            {/* Search Input */}
            <div className="flex items-center border border-gray-200 rounded px-4 py-3 mb-4">
              <span className="text-gray-400 mr-3">🔍</span>
              <input
                type="text"
                placeholder="e.g. frontend developer, react js, backend..."
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
                className="w-full text-sm focus:outline-none"
              />
            </div>

            {/* Dropdown hasil search */}
            {searchSkill && filteredSkills.length > 0 && (
              <div className="border border-gray-200 rounded mb-4 max-h-40 overflow-y-auto">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill}
                    onClick={() => handleSelectSkill(skill)}
                    className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}

            {/* Selected Skills */}
            {selectedSkills.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">
                  Dipilih ({selectedSkills.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 border border-gray-300 px-3 py-1 text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-gray-400 hover:text-black"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2 - Deskripsi */}
        {step === 2 && (
          <div className="w-full max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
              Deskripsikan tentang pengalamanmu atau skill kamu
            </h1>
            <textarea
              className="w-full border border-gray-200 p-4 text-sm text-gray-700 focus:outline-none resize-none"
              rows={10}
              placeholder="Deskripsikan pengalaman anda pernah ikut magang apa organisasi apa pengalaman apa saja berapa IPK nya berapa asal univ mana"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="px-10 py-6 flex items-center justify-between">
        <button
          onClick={() => setStep(step - 1)}
          className={`text-sm text-gray-400 ${step === 1 ? 'invisible' : ''}`}
        >
          Kembali
        </button>
        <p className="text-sm text-gray-400">Langkah {step} dari 2</p>
        {step === 1 ? (
          <button
            onClick={() => setStep(2)}
            disabled={selectedSkills.length === 0}
            className="text-sm font-bold disabled:opacity-30"
          >
            Selanjutnya
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={description.length < 20 || loading}
            className="text-sm font-bold disabled:opacity-30"
          >
            {loading ? 'Menyimpan...' : 'Selanjutnya'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
