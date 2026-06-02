const dlService = require('../services/dlService');
const database = require('../services/databaseClient');
const { formatSkillRecommendations } = require('../utils/skillFormatter');

const KURS_USD_TO_IDR = 17000;

const formatToIDR = (usdAmount) => {
  const idr = Math.round((usdAmount * KURS_USD_TO_IDR) / 1000) * 1000;
  return "Rp " + idr.toLocaleString('id-ID');
};

const convertTextToIDR = (text) => {
  if (!text) return text;
  return text.replace(/\$\d+(\.\d+)?/g, (match) => {
    const usd = parseFloat(match.replace('$', ''));
    return formatToIDR(usd);
  });
};

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

    const result = await dlService.getPrediction({
      category,
      experience_level,
      skills,
      description,
      country,
      client_rating,
      client_review_count,
    });

    const nearestWholeUSD = Math.round(result.predicted_rate_usd); 

    const numericRateIDR = nearestWholeUSD * KURS_USD_TO_IDR;
    const formattedRateIDR = "Rp " + numericRateIDR.toLocaleString('id-ID');
    
    const formattedRateRange = convertTextToIDR(result.rate_range);

    const formattedDescription = { ...result.rating_description };
    if (formattedDescription.detail) {
      formattedDescription.detail = convertTextToIDR(formattedDescription.detail);
    }
    if (formattedDescription.headline) {
      formattedDescription.headline = convertTextToIDR(formattedDescription.headline);
    }

    const finalizedSkillRecommendations = formatSkillRecommendations(result.skill_recommendations);

    database
      .from('prediction_history')
      .insert({
        role: category,
        experience_level,
        skills,
        description,
        country,
        client_rating,
        client_review_count,
        predicted_rate: numericRateIDR,
        rate_range: formattedRateRange,
        confidence: result.confidence,
        skill_recommendations: finalizedSkillRecommendations
      })
      .then()
      .catch((err) => console.error('[Database Insert Error]', err.message));

    res.json({
      success: true,
      data: {
        predicted_rate: formattedRateIDR,
        rate_range: formattedRateRange,
        confidence: result.confidence,
        rating_description: formattedDescription,
        skill_recommendations: finalizedSkillRecommendations,
        job_suggestions: result.job_suggestions,
        detected_role: result.detected_role,
        currency: 'IDR',
      },
    });
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      error.message = 'DL service is not available. Please try again later.';
    }
    next(error);
  }
};

module.exports = { predict };
