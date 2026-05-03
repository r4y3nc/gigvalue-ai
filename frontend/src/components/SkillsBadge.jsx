import { useEffect, useState } from 'react';
import { getSkills } from '../services/api';

const SkillsBadge = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then((res) => setSkills(res.data.skills));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        🛠️ Supported IT Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsBadge;