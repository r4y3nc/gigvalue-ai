const axios = require('axios');

const healthCheck = async (req, res) => {
    let mlStatus = 'unavailable';

    try {
        await axios.get(`${process.env.DL_SERVICE_URL}/health`);
        mlStatus = 'available';
    } catch {
        mlStatus = 'unavailable';
    }

    res.json({
        success: true,
        data: {
            server: 'available',
            mlService: mlStatus,
            timestamp: new Date().toISOString(),
        },
    });
};

module.exports = { healthCheck };