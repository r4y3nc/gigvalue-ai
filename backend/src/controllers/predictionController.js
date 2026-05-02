const mlService = require('../services/mlService');
const supabase = require('../services/supabaseClient');

const predict = async (req, res, next) => {
  try {
    const profileData = req.body;
    const result = await mlService.getPrediction(profileData);

    const { error } = await supabase
      .from('predictions')
      .insert({
        description: profileData.description,
        predicted_rate: result.predicted_rate,
      });

    if (error) throw new Error(error.message);

    res.json({ success: true, data: result });
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
        error.message = 'ML service is not available. Please try again later.';
    }
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw new Error(error.message);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports = { predict, getHistory };