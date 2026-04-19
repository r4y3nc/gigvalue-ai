const mlService = require('../services/mlService');

const predict = async (req, res, next) => {
  try {
    const profileData = req.body;
    const result = await mlService.getPrediction(profileData);
    res.json({ success: true, data: result });
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
        error.message = 'ML service is not available. Please try again later.';
    }
    next(error);
  }
};

module.exports = { predict };