const axios = require('axios');

const getPrediction = async (profileData) => {
  const response = await axios.post(
    `${process.env.ML_SERVICE_URL}/predict`,
    profileData
  );
  return response.data;
};

module.exports = { getPrediction };