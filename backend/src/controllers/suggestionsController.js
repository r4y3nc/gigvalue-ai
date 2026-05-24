const axios = require('axios');

const getAllSuggestions = async (req, res, next) => {
  try {
    const response = await axios.get(
      `${process.env.ML_SERVICE_URL}/api/suggestions`
    );
    res.json({ success: true, data: response.data });
  } catch (error) {
    next(error);
  }
};

const getSuggestionsByRole = async (req, res, next) => {
  try {
    const { role } = req.params;
    const response = await axios.get(
      `${process.env.ML_SERVICE_URL}/api/suggestions/${encodeURIComponent(role)}`
    );
    res.json({ success: true, data: response.data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllSuggestions, getSuggestionsByRole };
