require('dotenv').config();
const { getSkillImprovement } = require('./src/services/geminiService');

const test = async () => {
  const result = await getSkillImprovement(
    'Frontend Developer',
    ['React', 'Node.js'],
    25
  );
  console.log('Skill Improvement:', result);
};

test();