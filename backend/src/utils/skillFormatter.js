const SKILL_CAPITALIZATION_MAP = {
  "machine learning": "Machine Learning",
  "tensorflow": "TensorFlow",
  "pytorch": "PyTorch",
  "computer vision": "Computer Vision",
  "nlp": "NLP",
  "deep learning": "Deep Learning",
  "llm": "LLM",
  "gpt": "GPT",
  "transformers": "Transformers",
  "mlops": "MLOps",

  "aws": "AWS",
  "amazon web services": "Amazon Web Services",
  "azure": "Azure",
  "google cloud": "Google Cloud",
  "docker": "Docker",
  "kubernetes": "Kubernetes",
  "terraform": "Terraform",
  "ci/cd": "CI/CD",
  "devops": "DevOps",
  "serverless": "Serverless",

  "python": "Python",
  "golang": "Golang",
  "java": "Java",
  "fastapi": "FastAPI",
  "node.js": "Node.js",
  "nodejs": "Node.js",
  "express": "Express.js",
  "graphql": "GraphQL",
  "mongodb": "MongoDB",
  "postgresql": "PostgreSQL",
  "mysql": "MySQL",
  "redis": "Redis",
  "supabase": "Supabase",

  "react": "React",
  "next.js": "Next.js",
  "nextjs": "Next.js",
  "vue": "Vue.js",
  "angular": "Angular",
  "typescript": "TypeScript",
  "javascript": "JavaScript",
  "html": "HTML",
  "css": "CSS",
  "tailwind": "Tailwind CSS",
  "flutter": "Flutter",
  "react native": "React Native",
  "ios": "iOS",
  "android": "Android"
};

/**
 * @param {string[]} skills 
 * @returns {string[]}
 */
const formatSkillRecommendations = (skills) => {
  if (!Array.isArray(skills)) return [];
  return skills.map(skill => {
    const cleanKey = skill.trim().toLowerCase();
    return SKILL_CAPITALIZATION_MAP[cleanKey] || skill;
  });
};

module.exports = {
  formatSkillRecommendations
};
