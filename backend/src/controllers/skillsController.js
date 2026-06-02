const database = require('../services/databaseClient');
const { FALLBACK_SKILLS, CACHE_DURATION } = require('../data/constants');

let cachedSkills = null;
let lastFetchTime = 0;

const getSkills = async (req, res, next) => {
  try {
    const now = Date.now();

    if (cachedSkills && (now - lastFetchTime < CACHE_DURATION)) {
      return res.json({
        success: true,
        data: { skills: cachedSkills }
      });
    }

    const { data, error } = await database
      .from('skills')
      .select('name');

    if (error) {
      console.warn('[Database Warning] Menggunakan data fallback lokal karena:', error.message);
      return res.json({
        success: true,
        data: { skills: FALLBACK_SKILLS }
      });
    }

    const formattedSkills = data.map(item => item.name);

    cachedSkills = formattedSkills;
    lastFetchTime = now;

    res.json({
      success: true,
      data: { skills: cachedSkills }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSkills };
