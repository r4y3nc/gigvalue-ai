const mlService = require('../services/mlService');
const supabase = require('../services/supabaseClient');

const predict = async (req, res, next) => {
  try {
    const { job_title, description, skills } = req.body;
    const user_id = req.user.id;

    const result = await mlService.getPrediction({ job_title, description, skills });

    const { error } = await supabase
      .from('predictions')
      .insert({
        user_id,
        job_title,
        description,
        skills,
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
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw new Error(error.message);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports = { predict, getHistory };