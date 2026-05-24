const mlService = require('../services/mlService');
const supabase = require('../services/supabaseClient');
const { transformDescription, getSkillImprovement } = require('../services/geminiService');

const predict = async (req, res, next) => {
  try {
    const { job_title, experience_level, skills, description } = req.body;

    // Transform description jika ada
    let transformed_description = null;
    if (description) {
      transformed_description = await transformDescription(description, job_title, skills);
    }

    // Kirim ke FastAPI
    const result = await mlService.getPrediction({
      job_title,
      experience_level,
      skills,
      ...(transformed_description && { description: transformed_description }),
    });

    // Get skill improvement dari Gemini
    const skill_improvement = await getSkillImprovement(
      job_title,
      skills,
      result.predicted_rate
    );

    // Simpan ke Supabase
    const { error } = await supabase
      .from('predictions')
      .insert({
        job_title,
        skills,
        experience_level,
        description: description || null,
        transformed_description,
        predicted_rate: result.predicted_rate,
        currency: 'USD',
      });

    if (error) throw new Error(error.message);

    res.json({
      success: true,
      data: {
        predicted_rate: result.predicted_rate,
        confidence_score: result.confidence_score,
        skill_improvement,
        currency: 'USD',
      },
    });
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