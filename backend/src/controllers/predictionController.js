const mlService = require('../services/mlService');
const supabase = require('../services/supabaseClient');

const predict = async (req, res, next) => {
  try {
    const {
      category,
      experience_level,
      skills,
      description,
      country,
      client_rating,
      client_review_count,
    } = req.body;

    const result = await mlService.getPrediction({
      category,
      experience_level,
      skills,
      description,
      country,
      client_rating,
      client_review_count,
    });

    supabase
      .from('predictions')
      .insert({
        job_title: category,
        skills,
        experience_level,
        description,
        predicted_rate: result.predicted_rate_usd,
        currency: 'USD',
      })
      .then()
      .catch((err) => console.error('[Supabase Insert Error]', err.message));

    res.json({
      success: true,
      data: {
        predicted_rate: result.predicted_rate_usd,
        rate_range: result.rate_range,
        confidence: result.confidence,
        rating_description: result.rating_description,
        skill_recommendations: result.skill_recommendations,
        job_suggestions: result.job_suggestions,
        detected_role: result.detected_role,
        currency: 'USD',
      },
    });
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      error.message = 'DL service is not available. Please try again later.';
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