const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const transformDescription = async (description, category, skills) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `
    Convert the following freelancer profile description into a job posting format in English.
    The job posting should be written from a client's perspective looking for a freelancer.
    
    Freelancer Category: ${category}
    Freelancer Skills: ${skills.join(', ')}
    Freelancer Description: ${description}
    
    Rules:
    - Write in English
    - Start with the job title/category
    - Mention the required skills naturally
    - Keep it concise (max 3 sentences)
    - Do not add any explanation, just the job posting text
    
    Job Posting:
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};

module.exports = { transformDescription };