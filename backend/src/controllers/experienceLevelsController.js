const getExperienceLevels = (req, res) => {
  const experienceLevels = ['Entry level', 'Intermediate', 'Expert'];

  res.json({
    success: true,
    data: { experienceLevels },
  });
};

module.exports = { getExperienceLevels };