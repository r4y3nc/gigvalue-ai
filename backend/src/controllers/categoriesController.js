const getCategories = (req, res) => {
  const categories = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'AI/ML Engineering',
    'UI/UX Design',
    'DevOps',
    'Cybersecurity',
    'Database Administration',
    'Cloud Computing',
    'Backend Development',
    'Frontend Development',
    'Full Stack Development',
  ];

  res.json({
    success: true,
    data: { categories },
  });
};

module.exports = { getCategories };