const axios = require('axios');

const getPrediction = async (profileData) => {
  const {
    category,
    experience_level,
    skills,
    description,
    country,
    client_rating,
    client_review_count,
  } = profileData;

  const payload = {
    category,
    experience: experience_level,
    skills: Array.isArray(skills) ? skills.join(', ') : skills,
    description,
    ...(country && { country }),
    ...(client_rating !== undefined && { client_rating }),
    ...(client_review_count !== undefined && { client_review_count }),
  };

  const response = await axios.post(
    `${process.env.DL_SERVICE_URL}/model/predict`,
    payload
  );
  return response.data;
};

module.exports = { getPrediction };