const database = require('./databaseClient');

const savePredictionHistory = (data) => {
  database
    .from('prediction_history')
    .insert({
      role: data.category,
      experience_level: data.experience_level,
      skills: data.skills,
      description: data.description,
      country: data.country,
      client_rating: data.client_rating,
      client_review_count: data.client_review_count,
      predicted_rate: data.numericRateIDR,
      rate_range: data.formattedRateRange,
      confidence: data.confidence,
      skill_recommendations: data.finalizedSkillRecommendations
    })
    .then()
    .catch((err) => console.error('[Database Insert Error]', err.message));
};

module.exports = {
  savePredictionHistory,
};
