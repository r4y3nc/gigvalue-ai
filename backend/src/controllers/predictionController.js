// src/controllers/predictionController.js
const mlService = require('../services/mlService');
const supabase = require('../services/supabaseClient');
const { formatSkillRecommendations } = require('../utils/skillFormatter');

const KURS_USD_TO_IDR = 17000;

// Helper untuk format teks mata uang Rupiah
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

    const result = await mlService.getPrediction({
      category,
      experience_level,
      skills,
      description,
      country,
      client_rating,
      client_review_count,
    });

    // 🌟 SOLUSI: Bulatkan nilai USD ke angka bulat terdekat dahulu (e.g., 19.88 menjadi 20)
    // Ini menyamakan logika berpikir AI generator saat menulis teks deskripsi
    const nearestWholeUSD = Math.round(result.predicted_rate_usd); 

    // Hitung nilai IDR berdasarkan angka USD yang sudah bulat manis
    const numericRateIDR = nearestWholeUSD * KURS_USD_TO_IDR;
    const formattedRateIDR = "Rp " + numericRateIDR.toLocaleString('id-ID');
    
    // Konversi teks range pasar (e.g., "$15 - $25" -> "Rp 255.000 - Rp 425.000")
    const formattedRateRange = convertTextToIDR(result.rate_range);

    // Membedah dan mengonversi teks di dalam Object rating_description secara aman
    const formattedDescription = { ...result.rating_description };
    if (formattedDescription.detail) {
      formattedDescription.detail = convertTextToIDR(formattedDescription.detail);
    }
    if (formattedDescription.headline) {
      formattedDescription.headline = convertTextToIDR(formattedDescription.headline);
    }

    // Rapikan kapitalisasi kata kunci skill rekomendasi AI di backend
    const finalizedSkillRecommendations = formatSkillRecommendations(result.skill_recommendations);

    supabase
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
      .catch((err) => console.error('[Supabase Insert Error]', err.message));

    res.json({
      success: true,
      data: {
        predicted_rate: formattedRateIDR,       // 🌟 Sekarang bernilai "Rp 340.000"
        rate_range: formattedRateRange,
        confidence: result.confidence,
        rating_description: formattedDescription, // 🌟 Di dalam teks detail juga otomatis "Rp 340.000"
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
