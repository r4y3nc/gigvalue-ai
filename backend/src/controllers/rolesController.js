const database = require('../services/databaseClient');
const { FALLBACK_ROLES, CACHE_DURATION } = require('../data/constants');

let cachedRoles = null;
let lastFetchTime = 0;

const getRoles = async (req, res, next) => {
  try {
    const now = Date.now();

    if (cachedRoles && (now - lastFetchTime < CACHE_DURATION)) {
      return res.json({
        success: true,
        data: { roles: cachedRoles }
      });
    }

    const { data, error } = await database
      .from('roles')
      .select('name');

    if (error) {
      console.warn('[Database Warning] Menggunakan data fallback lokal karena:', error.message);
      return res.json({
        success: true,
        data: { roles: FALLBACK_ROLES }
      });
    }

    const formattedRoles = data.map(item => item.name);

    cachedRoles = formattedRoles;
    lastFetchTime = now;

    res.json({
      success: true,
      data: { roles: cachedRoles }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRoles };
