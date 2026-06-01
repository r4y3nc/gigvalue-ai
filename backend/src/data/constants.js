const FALLBACK_ROLES = [
  "Web Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Mobile Developer", "iOS Developer", "Android Developer", "Software Engineer",
  "Software Architect", "QA Tester", "Game Developer", "Embedded Systems Engineer",
  "Data Scientist", "Data Analyst", "Data Engineer", "Business Intelligence Analyst",
  "AI Engineer", "Machine Learning Engineer", "Prompt Engineer", "Blockchain Developer",
  "Web3 Developer", "Smart Contract Developer", "Cloud Engineer", "DevOps Engineer",
  "System Administrator", "Database Administrator", "Cybersecurity Specialist", "Network Engineer",
  "IT Support Specialist", "Designer", "UI/UX Designer", "Graphic Designer",
  "Motion Graphics Designer", "Illustrator", "Video Editor", "Animator",
  "3D Artist", "Art Director", "Creative Specialist", "Sound Designer",
  "Digital Marketer", "SEO Specialist", "SEM / PPC Specialist", "Social Media Manager",
  "Email Marketing Specialist", "Growth Hacker", "Content Strategist", "Sales Specialist",
  "Business Developer", "Lead Generation Specialist", "Writer", "Content Creator",
  "Copywriter", "Technical Writer", "Ghostwriter", "Copy Editor",
  "Translator", "Transcriptionist", "Project Manager", "Product Manager",
  "Scrum Master", "Finance Specialist", "Accountant", "Financial Analyst",
  "Bookkeeper", "Business Consultant", "HR Specialist", "Recruiter",
  "Virtual Assistant", "Data Entry Specialist", "Customer Service Representative", "Technical Support Specialist",
  "E-commerce Manager", "Researcher", "Market Researcher", "Legal Advisor",
  "Paralegal", "Instructional Designer"
];

const FALLBACK_SKILLS = [
  'Machine Learning', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP',
  'Deep Learning', 'LLM', 'GPT', 'Transformers', 'MLOps',
  'LangChain', 'LlamaIndex', 'RAG (Retrieval-Augmented Generation)', 'Prompt Engineering', 'AI Agents',
  'Vector Databases', 'Pinecone', 'ChromaDB', 'Milvus',
  'Data Engineering', 'Apache Spark', 'Apache Airflow', 'dbt', 'Data Pipelines',
  'Scikit-learn', 'Pandas', 'NumPy', 'AWS', 'Amazon Web Services',
  'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform',
  'CI/CD', 'DevOps', 'Serverless', 'GitHub Actions', 'GitLab CI',
  'Ansible', 'GitOps', 'Prometheus', 'Grafana', 'Datadog',
  'ELK Stack', 'Cloud Security', 'Python', 'Golang', 'Java',
  'FastAPI', 'Django', 'Flask', 'Spring Boot', 'Node.js',
  'Express.js', 'NestJS', 'Rust', 'PostgreSQL', 'MongoDB',
  'Redis', 'GraphQL', 'RESTful API', 'gRPC', 'WebSockets',
  'Supabase', 'Firebase', 'DynamoDB', 'React', 'Next.js',
  'TypeScript', 'Vue.js', 'Angular', 'Tailwind CSS', 'Svelte',
  'Remix', 'Astro', 'Nuxt.js', 'Shadcn UI', 'Redux',
  'Zustand', 'Flutter', 'React Native', 'Swift', 'Kotlin',
  'Expo', 'SwiftUI', 'Jetpack Compose', 'Blockchain', 'Solidity',
  'Smart Contract', 'Web3', 'Solana', 'Hardhat', 'Foundry',
  'DeFi', 'Cybersecurity', 'Penetration Testing', 'Ethical Hacking', 'DevSecOps',
  'IAM', 'Zapier', 'Make.com', 'Bubble', 'Webflow',
  'Retool', 'Integromat', 'Shopify', 'WordPress', 'Headless CMS',
  'Strapi', 'Contentful', 'Consultant', 'Strategy', 'SaaS',
  'Technical Leadership', 'Product Management', 'Agile', 'Scrum', 'UI/UX Design',
  'Figma', 'System Architecture'
];

CACHE_DURATION = 1000 * 60 * 60;

module.exports = { FALLBACK_ROLES, FALLBACK_SKILLS, CACHE_DURATION};
