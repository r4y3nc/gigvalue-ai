require('dotenv').config();
const { transformDescription } = require('./src/services/geminiService');

const test = async () => {
  const result = await transformDescription(
    'I have 3 years of experience in web development using React and Node.js. I can build REST APIs and responsive web apps.',
    'Web Development',
    ['React', 'Node.js', 'REST API']
  );
  console.log('Result:', result);
};

test();