const axios = require('axios');

const DEFAULT_RATE = Number(process.env.KURS_USD_TO_IDR) || 17900;
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000;

let cache = {
  rate: null,
  date: null,
  timestamp: 0,
};

const getExchangeRate = async () => {
  const now = Date.now();

  if (cache.rate && (now - cache.timestamp < CACHE_DURATION_MS)) {
    return {
      rate: cache.rate,
      formatted_rate: `1 USD = Rp ${cache.rate.toLocaleString('id-ID')}`,
      date: cache.date,
      source: 'Frankfurter API (Cache)',
      is_fallback: false,
    };
  }

  try {
    const response = await axios.get(
      'https://api.frankfurter.app/latest?base=USD&symbols=IDR',
      { timeout: 3000 }
    );

    const rate = response.data?.rates?.IDR;
    const date = response.data?.date;

    if (rate) {
      cache = { rate, date, timestamp: now };
      return {
        rate,
        formatted_rate: `1 USD = Rp ${rate.toLocaleString('id-ID')}`,
        date,
        source: 'Frankfurter API',
        is_fallback: false,
      };
    }
  } catch (error) {
    console.error('Gagal mengambil kurs dari Frankfurter API:', error.message);
  }

  const fallbackRate = cache.rate || DEFAULT_RATE;
  const fallbackDate = cache.date || null;

  return {
    rate: fallbackRate,
    formatted_rate: `1 USD = Rp ${fallbackRate.toLocaleString('id-ID')}`,
    date: fallbackDate,
    source: cache.rate ? 'Cache Terakhir' : 'Lingkungan (.env)',
    is_fallback: true,
  };
};

module.exports = { getExchangeRate };
