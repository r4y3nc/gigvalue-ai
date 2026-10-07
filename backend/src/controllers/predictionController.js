const dlService = require('../services/dlService');
const historyService = require('../services/historyService');
const { getExchangeRate } = require('../services/exchangeRateService');
const { formatSkillRecommendations } = require('../utils/skillFormatter');
const { calculateIDR, formatToIDR, convertTextToIDR } = require('../utils/currency');
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

    const [result, exchangeRateInfo] = await Promise.all([
      dlService.getPrediction({
        category,
        experience_level,
        skills,
        description,
        country,
        client_rating,
        client_review_count,
      }),
      getExchangeRate(),
    ]);

    const currentRate = exchangeRateInfo.rate;
    
    const predictedUSD = Math.round(result.predicted_rate_usd);

    const numericRateIDR = calculateIDR(result.predicted_rate_usd, currentRate);
    const formattedRateIDR = formatToIDR(result.predicted_rate_usd, currentRate);

    const formattedRateRange = result.rate_range
      ? convertTextToIDR(result.rate_range, currentRate)
      : null;

    const formattedDescription = { ...result.rating_description };
    if (formattedDescription.detail) {
      formattedDescription.detail = convertTextToIDR(formattedDescription.detail, currentRate);
    }
    if (formattedDescription.headline) {
      formattedDescription.headline = convertTextToIDR(formattedDescription.headline, currentRate);
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
        original_currency: 'USD',
        predicted_rate_original: `$${predictedUSD}`,
        rate_range_original: result.rate_range || null,
        exchange_rate: exchangeRateInfo,
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
