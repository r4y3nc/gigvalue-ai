const mlService = require('../services/mlService');

const predict = async (req, res) => {
  try {
    const profileData = req.body;
    const result = await mlService.getPrediction(profileData);
    res.json({ success: true, data: result });
  } catch (error) {
    const message =
        error.code === 'ECONNREFUSED'
            ? 'ML service is not available. Please try again later.'
            : error.message;

    res.status(500).json({ success: false, message });
  }
};

module.exports = { predict };