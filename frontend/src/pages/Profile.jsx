import { useState, useEffect } from 'react';
import { getProfile, saveProfile, getSkills, getExperienceLevels } from '../services/api';

const Profile = ({ session }) => {
  const [skills, setSkills] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [searchSkill, setSearchSkill] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [profileRes, skillsRes, experienceLevelsRes] = await Promise.all([
        getProfile(session.access_token),
        getSkills(),
        getExperienceLevels(),
      ]);
      const profileData = profileRes.data;
      setSelectedSkills(profileData?.skills || []);
      setDescription(profileData?.description || '');
      setExperienceLevel(profileData?.experience_level || '');
      setSkills(skillsRes.data.skills);
      setExperienceLevels(experienceLevelsRes.data.experienceLevels);
    };
    fetchData();
  }, []);

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchSkill.toLowerCase()) &&
    !selectedSkills.includes(skill)
  );

  const handleAddSkill = (skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    setSearchSkill('');
    setShowSearch(false);
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      await saveProfile({
        description,
        skills: selectedSkills,
        experience_level: experienceLevel,
      }, session.access_token);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (email) => {
    return email?.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex gap-10">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500 border border-gray-200">
              {getInitials(session?.user?.email)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Name */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {session?.user?.email?.split('@')[0]}
            </h1>

            {/* Experience Level */}
            <p className="text-base font-semibold text-gray-900 mb-3">Level Pengalaman</p>
            <div className="flex gap-2 mb-6">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setExperienceLevel(level)}
                  className={`px-4 py-2 text-sm border transition ${
                    experienceLevel === level
                      ? 'bg-black text-white border-black'
                      : 'border-gray-200 text-gray-500 hover:border-black'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Skill Tags */}
            <p className="text-base font-semibold text-gray-900 mb-3">Skill tag</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm cursor-pointer hover:border-red-300 hover:text-red-400 transition"
                  onClick={() => handleRemoveSkill(skill)}
                  title="Klik untuk hapus"
                >
                  {skill}
                </div>
              ))}
              <div className="relative">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center text-xl text-gray-400 hover:border-black hover:text-black transition"
                >
                  +
                </button>
                {showSearch && (
                  <div className="absolute left-0 top-12 z-10 bg-white border border-gray-200 shadow-md w-56">
                    <input
                      type="text"
                      placeholder="Cari skill..."
                      value={searchSkill}
                      onChange={(e) => setSearchSkill(e.target.value)}
                      className="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none"
                      autoFocus
                    />
                    <div className="max-h-40 overflow-y-auto">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill) => (
                          <div
                            key={skill}
                            onClick={() => handleAddSkill(skill)}
                            className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                          >
                            {skill}
                          </div>
                        ))
                      ) : (
                        <p className="px-3 py-2 text-xs text-gray-400">Tidak ditemukan</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex items-center gap-2 mb-3">
              <p className="text-base font-semibold text-gray-900">Deskripsi saya</p>
              <span className="text-gray-400 text-sm"></span>
            </div>
            <textarea
              className="w-full border border-gray-200 p-4 text-sm text-gray-700 focus:outline-none resize-none"
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Save Button */}
            <div className="flex justify-end mt-4">
              {success && (
                <p className="text-green-500 text-sm mr-4 self-center">
                  Profil berhasil disimpan!
                </p>
              )}
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-gray-100 text-gray-700 px-6 py-2 text-sm font-medium hover:bg-gray-200 transition disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;