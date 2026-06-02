const dlService = require('../services/dlService');
const historyService = require('../services/historyService');
const { formatSkillRecommendations } = require('../utils/skillFormatter');
const { KURS_USD_TO_IDR, convertTextToIDR } = require('../utils/currency');
const { BadGatewayError } = require('../errors');

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
    
    const formattedRateRange = result.rate_range
      ? convertTextToIDR(result.rate_range)
      : null;

    const formattedDescription = { ...result.rating_description };
    if (formattedDescription.detail) {
      formattedDescription.detail = convertTextToIDR(formattedDescription.detail);
    }
    if (formattedDescription.headline) {
      formattedDescription.headline = convertTextToIDR(formattedDescription.headline);
    }

    const finalizedSkillRecommendations = formatSkillRecommendations(result.skill_recommendations);

    historyService.savePredictionHistory({
      category,
      experience_level,
      skills,
      description,
      country,
      client_rating,
      client_review_count,
      numericRateIDR,
      formattedRateRange,
      confidence: result.confidence,
      finalizedSkillRecommendations
    });

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
      return next(new BadGatewayError('DL service is not available. Please try again later.'));
    }
    next(error);
  }
};

module.exports = { predict };
