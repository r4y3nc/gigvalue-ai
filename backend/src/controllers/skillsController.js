const getSkills = (req, res) => {
  const skills = [
    'Machine Learning', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP',
    'Deep Learning', 'LLM', 'GPT', 'Transformers', 'MLOps',
    'AWS', 'Amazon Web Services', 'Azure', 'Google Cloud', 'Docker',
    'Kubernetes', 'Terraform', 'CI/CD', 'DevOps', 'Serverless',
    'Python', 'Golang', 'Java', 'FastAPI', 'Django', 'Flask',
    'Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'RESTful API',
    'React', 'Next.js', 'TypeScript', 'Vue.js', 'Angular', 'Tailwind CSS', 'Svelte',
    'Flutter', 'React Native', 'Swift', 'Kotlin',
    'Blockchain', 'Solidity', 'Smart Contract', 'Web3',
    'Cybersecurity', 'Penetration Testing', 'Ethical Hacking',
    'Consultant', 'Strategy', 'SaaS', 'Technical Leadership',
  ];

  res.json({
    success: true,
    data: { skills },
  });
};

module.exports = { getSkills };
