const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const transformDescription = async (description, job_title, skills) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
    Convert the following freelancer profile description into a job posting format in English.
    The job posting should be written from a client's perspective looking for a freelancer.
    
    Job Title: ${job_title}
    Freelancer Skills: ${skills.join(', ')}
    Freelancer Description: ${description}
    
    Rules:
    - Write in English
    - Start with the job title
    - Mention the required skills naturally
    - Keep it concise (max 3 sentences)
    - Do not add any explanation, just the job posting text
    
    Job Posting:
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};

const getSkillImprovement = async (job_title, skills, predicted_rate) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `
    You are a freelance career advisor. Given a freelancer's profile, suggest skills they should learn to increase their hourly rate.
    
    Job Title: ${job_title}
    Current Skills: ${skills.join(', ')}
    Current Predicted Hourly Rate: $${predicted_rate}/hour
    
    Rules:
    - Suggest exactly 4 skills
    - Skills must be relevant to the job title
    - Skills should be ones that typically command higher rates
    - Return ONLY a JSON array of skill name strings, no explanation
    - Example: ["Skill1", "Skill2", "Skill3", "Skill4"]
    
    Response:
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().trim();

  try {
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return [];
  }
};

module.exports = { transformDescription, getSkillImprovement };